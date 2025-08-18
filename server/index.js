import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash-live-001';

if (!GEMINI_API_KEY) {
  console.warn('[WARN] GOOGLE_API_KEY / GEMINI_API_KEY is not set. Set it in your .env file.');
}

const app = express();
app.use(cors());
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/live' });

// Helper: safe JSON send
function sendJson(ws, obj) {
  try {
    ws.send(JSON.stringify(obj));
  } catch (err) {
    console.error('[SERVER] Failed to send JSON to client:', err);
  }
}

// Bridge each client connection to a Gemini Live session
wss.on('connection', (clientWs) => {
  console.log('[SERVER] Client connected');
  let upstream; // WebSocket to Gemini
  let isUpstreamOpen = false;
  let pendingBinaryChunks = [];

  function closeBoth(code = 1000, reason = 'closing') {
    try { if (upstream && isUpstreamOpen) upstream.close(code, reason); } catch {}
    try { clientWs.close(code, reason); } catch {}
  }

  // Connect to Gemini Live
  try {
    const upstreamUrl = `wss://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:connect?key=${encodeURIComponent(GEMINI_API_KEY)}`;
    upstream = new (await import('ws')).WebSocket(upstreamUrl, { perMessageDeflate: false });
  } catch (err) {
    console.error('[SERVER] Failed to create upstream WS:', err);
    sendJson(clientWs, { type: 'error', error: 'Failed to initialize upstream connection' });
    clientWs.close();
    return;
  }

  upstream.on('open', () => {
    isUpstreamOpen = true;
    console.log('[SERVER] Upstream (Gemini) connected');

    // Configure session: server VAD and PCM output
    const instructions = process.env.SYSTEM_INSTRUCTIONS || 'You are Rev, the Revolt Motors assistant. Only discuss Revolt Motors products, pricing, service, test rides, dealership locations, financing, and company policies. Politely refuse unrelated topics.';
    const spokenLanguage = process.env.SPOKEN_LANGUAGE || 'en-IN';
    const voice = process.env.VOICE || 'Puck';

    sendJson(upstream, {
      type: 'session.update',
      session: {
        modalities: ['AUDIO', 'TEXT'],
        instructions,
        voice,
        // Let the server detect end-of-speech
        turn_detection: { type: 'server_vad' },
        // Ask for low-latency PCM audio back
        generation_config: {
          response_mime_type: 'audio/pcm;rate=24000',
          spoken_language: spokenLanguage,
        },
      },
    });

    // Drain any pending audio chunks sent before upstream was open
    if (pendingBinaryChunks.length > 0) {
      for (const chunk of pendingBinaryChunks) {
        sendJson(upstream, {
          type: 'input_audio_buffer.append',
          audio: {
            data: chunk.toString('base64'),
            mime_type: 'audio/webm;codecs=opus',
          },
        });
      }
      pendingBinaryChunks = [];
    }
  });

  upstream.on('message', (data, isBinary) => {
    // Proxy everything downstream to the browser client unchanged
    try {
      if (isBinary) {
        clientWs.send(data, { binary: true });
      } else {
        // Optionally, intercept output_audio.delta and forward only PCM bytes for simpler playback
        // But by default, just relay the JSON string as-is
        clientWs.send(data.toString());
      }
    } catch (err) {
      console.error('[SERVER] Failed to forward upstream message to client:', err);
    }
  });

  upstream.on('error', (err) => {
    console.error('[SERVER] Upstream error:', err);
    sendJson(clientWs, { type: 'error', error: 'Upstream error' });
  });

  upstream.on('close', (code, reason) => {
    console.log('[SERVER] Upstream closed:', code, reason?.toString());
    isUpstreamOpen = false;
    try { clientWs.close(); } catch {}
  });

  // From browser client -> to Gemini
  clientWs.on('message', (msg, isBinary) => {
    if (!isUpstreamOpen) {
      if (isBinary) {
        pendingBinaryChunks.push(Buffer.from(msg));
      } else {
        // queue JSON? For simplicity, drop until upstream opens
      }
      return;
    }

    if (isBinary) {
      // Treat as mic audio (webm/opus). Wrap and send as append
      const buf = Buffer.from(msg);
      sendJson(upstream, {
        type: 'input_audio_buffer.append',
        audio: {
          data: buf.toString('base64'),
          mime_type: 'audio/webm;codecs=opus',
        },
      });
      return;
    }

    // JSON control messages
    let payload;
    try { payload = JSON.parse(msg.toString()); } catch {
      return;
    }

    const evtType = payload?.type;
    switch (evtType) {
      case 'commit': {
        sendJson(upstream, { type: 'input_audio_buffer.commit' });
        sendJson(upstream, { type: 'response.create' });
        break;
      }
      case 'interrupt': {
        // Cancel any in-flight response to enable barge-in
        sendJson(upstream, { type: 'response.cancel' });
        break;
      }
      case 'session.update': {
        // Pass-through for client-driven updates (lang/voice)
        sendJson(upstream, { type: 'session.update', session: payload.session || {} });
        break;
      }
      default: {
        // Pass-through any other JSON payloads directly
        try { upstream.send(JSON.stringify(payload)); } catch {}
      }
    }
  });

  clientWs.on('close', () => {
    console.log('[SERVER] Client closed');
    try { if (upstream && isUpstreamOpen) upstream.close(1000, 'client closed'); } catch {}
  });

  clientWs.on('error', (err) => {
    console.error('[SERVER] Client error:', err);
    closeBoth(1011, 'client error');
  });
});

server.listen(PORT, () => {
  console.log(`[SERVER] Listening on http://localhost:${PORT}`);
});


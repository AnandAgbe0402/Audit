import React, { useEffect, useRef, useState } from 'react';

function createAudioWorklet(context) {
  // Fallback: simple ScriptProcessor decoding 16-bit PCM mono at 24kHz
  const node = context.createScriptProcessor(2048, 0, 1);
  node.onprocessaudio = null;
  return node;
}

export default function VoiceChat() {
  const [connected, setConnected] = useState(false);
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState('idle');
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const pcmQueueRef = useRef([]);
  const pcmSourceRef = useRef(null);
  const playingRef = useRef(false);

  useEffect(() => {
    return () => {
      try { if (wsRef.current) wsRef.current.close(); } catch {}
      try { if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop(); } catch {}
      try { if (audioContextRef.current) audioContextRef.current.close(); } catch {}
    };
  }, []);

  function connect() {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.hostname}:${3001}/live`;
    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';
    ws.onopen = () => {
      setConnected(true);
      setStatus('connected');
    };
    ws.onmessage = (evt) => {
      if (typeof evt.data === 'string') {
        const msg = safeParse(evt.data);
        if (msg?.type === 'response.output_audio.delta' && msg?.audio) {
          enqueuePcm(msg.audio);
        }
        if (msg?.type === 'response.completed') {
          // done speaking
        }
      } else {
        // binary not expected from server; ignore
      }
    };
    ws.onclose = () => {
      setConnected(false);
      setStatus('disconnected');
    };
    ws.onerror = () => setStatus('error');
    wsRef.current = ws;
  }

  function safeParse(s) {
    try { return JSON.parse(s); } catch { return null; }
  }

  async function startMic() {
    if (recording) return;
    connect();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mimeType = 'audio/webm;codecs=opus';
    const mr = new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 32000 });
    mr.ondataavailable = (e) => {
      if (e.data && e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
        e.data.arrayBuffer().then((buf) => wsRef.current.send(buf));
      }
    };
    mr.onstart = () => setStatus('recording');
    mr.start(100); // 100ms chunks
    mediaRecorderRef.current = mr;

    // Audio playback
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    }
    setRecording(true);
  }

  function stopMic() {
    if (!recording) return;
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== 'inactive') mr.stop();
    setRecording(false);
    setStatus('connected');
  }

  function commitTurn() {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'commit' }));
    }
  }

  function interrupt() {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'interrupt' }));
      // Also stop local playback queue
      pcmQueueRef.current = [];
    }
  }

  function enqueuePcm(audioObj) {
    // audioObj could be { data: base64 } per docs; handle both string or object
    const base64 = audioObj?.data || audioObj;
    if (!base64) return;
    const raw = atob(base64);
    const len = raw.length;
    const pcm = new Int16Array(len / 2);
    for (let i = 0; i < len; i += 2) {
      pcm[i / 2] = (raw.charCodeAt(i) | (raw.charCodeAt(i + 1) << 8)) << 0;
    }
    pcmQueueRef.current.push(pcm);
    if (!playingRef.current) schedulePlayback();
  }

  function schedulePlayback() {
    const ctx = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    audioContextRef.current = ctx;
    if (playingRef.current) return;
    playingRef.current = true;

    const playNext = () => {
      const next = pcmQueueRef.current.shift();
      if (!next) {
        playingRef.current = false;
        return;
      }
      const buffer = ctx.createBuffer(1, next.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < next.length; i++) {
        channelData[i] = Math.max(-1, Math.min(1, next[i] / 32768));
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      src.onended = () => playNext();
      src.start();
    };
    playNext();
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Revolt Voice Assistant (Gemini Live)</h2>
      <div className="text-sm text-gray-600">Status: {status}</div>
      <div className="flex gap-2">
        <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={startMic} disabled={recording}>Start</button>
        <button className="px-3 py-2 bg-gray-600 text-white rounded" onClick={stopMic} disabled={!recording}>Stop</button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={commitTurn}>Commit Turn</button>
        <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={interrupt}>Interrupt</button>
      </div>
      <p className="text-sm text-gray-700">Speak, then click Commit Turn (or rely on server VAD). Use Interrupt to barge-in while the AI is speaking.</p>
    </div>
  );
}


# Revolt Motors Voice Assistant (Gemini Live)

Server-to-server bridge using Node.js/Express + ws, with a simple React UI at `/voice`.

## Setup

1. Create a `.env` file in project root:

```
GOOGLE_API_KEY=YOUR_KEY_HERE
# or GEMINI_API_KEY=YOUR_KEY_HERE
GEMINI_MODEL=gemini-2.0-flash-live-001
# Final submission model (switch when recording demo):
# GEMINI_MODEL=gemini-2.5-flash-preview-native-audio-dialog
SYSTEM_INSTRUCTIONS=You are Rev, the Revolt Motors assistant. Only discuss Revolt Motors products, pricing, service, test rides, dealership locations, financing, and company policies. Politely refuse unrelated topics.
SPOKEN_LANGUAGE=en-IN
VOICE=Puck
PORT=3001
```

2. Install deps:

```
npm install
```

3. Run frontend and server concurrently:

```
npm run dev:all
```

4. Open the app in the browser (Vite default: `http://localhost:5173/voice`).

## Usage

- Click Start to stream mic audio (webm/opus) to the server bridge.
- Click Commit Turn or rely on server VAD to trigger a response.
- Click Interrupt to barge-in; the server sends `response.cancel` upstream.

## Notes

- For rate limits, use `gemini-2.0-flash-live-001` during development.
- For final submission, switch to `gemini-2.5-flash-preview-native-audio-dialog`. 
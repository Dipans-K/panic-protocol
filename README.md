# PANIC PROTOCOL — Operation Blackout

A cooperative, real-time crisis-management browser game for 2–8 players. This is a new project with its own game concept, interface, mission engine and source code. It is not a quiz game and does not reuse Brain Battle assets or source.

## Features
- Create a private six-character room or join with a code; no accounts.
- 2–8 operators and five specialist roles.
- Server-controlled eight-minute mission timer and four stages.
- Diagnosis, threat containment, infrastructure repair and simultaneous final recovery.
- Shared infrastructure integrity, resources, team score and team chat.
- Temporary reconnect token and 60-second grace period.
- Responsive desktop/mobile interface; in-memory rooms only.

## Requirements
Node.js 20+ and npm 10+.

## Run locally
From the project root:

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173. The backend health endpoint is http://localhost:3001/health.

## Test with two independent players
1. Open the game in a normal browser and create a room.
2. Open a private/incognito window or a second browser/device.
3. Enter a different callsign and the six-character room code.
4. Assign roles. Commander has fallback permissions for diagnosis, containment and repairs, allowing a two-player team to complete the operation. Dedicated specialists can also perform their own actions.
5. Both players mark ready. The host launches once two or more players are ready.
6. Use the mission buttons and team chat. Both browsers should show the same server timer, status, resources, score and messages.

For two devices on the same Wi-Fi, Vite is already configured with `--host 0.0.0.0`. Open `http://YOUR_COMPUTER_LAN_IP:5173` on the second device. Set `VITE_SERVER_URL=http://YOUR_COMPUTER_LAN_IP:3001` before starting Vite if required, and ensure the computer firewall allows ports 5173 and 3001.

## Mission rules
- Diagnose (0:00–1:30): Intelligence Officer or Commander investigates incident logs.
- Contain (1:30–3:30): Security Analyst or Commander marks C-04; a different player confirms.
- Restore (3:30–6:30): Network Engineer or Commander repairs power, communications, servers and firewall using limited resources.
- Final recovery (6:30–8:00): two different operators activate controls within 12 seconds.

The server advances stages on a shared clock. Victory requires final recovery before the eight-minute deadline. The team loses if the deadline expires before success. All scoring and state changes are validated on the server.

## Tests and build
```bash
npm test
npm run build
```
The server test suite covers room initialization, capacity, launch requirements, role-gated diagnosis and timer progression.

## Public deployment
### Backend on Render
1. Push this folder to a new GitHub repository.
2. Create a Render Web Service from that repository.
3. Build command: `npm install && npm run build -w server`
4. Start command: `npm run start -w server`
5. Set `CLIENT_ORIGIN` to the exact deployed Vercel URL.
6. Deploy and verify `https://YOUR-RENDER-SERVICE.onrender.com/health`.

### Frontend on Vercel
1. Import the same repository into Vercel.
2. Set the root directory to `client` and framework to Vite.
3. Set `VITE_SERVER_URL` to the Render backend URL, without a trailing slash.
4. Deploy. Then update Render's `CLIENT_ORIGIN` to the exact Vercel URL and redeploy the backend.

Use one persistent backend instance for this in-memory version. HTTPS/WSS is used automatically with deployed HTTPS endpoints.

## First-release limitations
- Backend restarts/deploys clear active rooms. There are no saved profiles, history or database.
- One server instance only; in-memory rooms are not horizontally scalable.
- Reconnection works only while the room remains in memory and the player's temporary token remains valid.
- Public deployment and physical-device verification must be completed in your hosting accounts; a source package alone does not establish that the public site is live.
- Before large public release, add platform-level rate limiting, abuse monitoring and operational logging.

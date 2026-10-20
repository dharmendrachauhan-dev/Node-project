import { Request, Response } from 'express';

export function getHealthStatus(_req: Request, res: Response) {
  const uptime = `${process.uptime().toFixed(1)}s`;
  const env = process.env.NODE_ENV || 'development';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome | Node.js Project</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 20%, #1e293b 0%, #0f172a 100%);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #f8fafc;
      padding: 1.5rem;
    }
    .card {
      background: rgba(30, 41, 59, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.25rem;
      padding: 2.5rem;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.12);
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(34, 197, 94, 0.15);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #4ade80;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 1.5rem;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 10px #22c55e;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      line-height: 1.25;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #38bdf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.75rem;
    }
    .author {
      font-size: 1.1rem;
      color: #94a3b8;
      margin-bottom: 2rem;
    }
    .author strong {
      color: #38bdf8;
      font-weight: 600;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      margin-top: 1.5rem;
      text-align: left;
    }
    .stat-item {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
    }
    .stat-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 0.25rem;
    }
    .stat-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: #e2e8f0;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span class="dot"></span> Server Operational
    </div>
    <h1>Welcome to Node.js Project</h1>
    <p class="author">Made by <strong>Dharmendra</strong></p>
    <div class="stats">
      <div class="stat-item">
        <div class="stat-label">Uptime</div>
        <div class="stat-value">${uptime}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Environment</div>
        <div class="stat-value">${env}</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  res.status(200).type('html').send(html);
}

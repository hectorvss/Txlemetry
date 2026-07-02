'use strict';
/**
 * server.cjs — zero-dependency static server for the Txlemetry landing.
 *
 *   node server.cjs            # port 8080
 *   PORT=3000 node server.cjs
 *
 * Behaviour (mirrors the production nginx config on Oracle):
 *   - serves this directory as web root
 *   - "/v2/..." also resolves to ./v2 (same layout)
 *   - extensionless routes (/pricing, /signin, ...) fall back to index.html (SPA)
 *   - /app is NOT handled here — in production nginx proxies /app to the
 *     Txlemetry (PostHog) SaaS running on the same Oracle VM.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8080);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function send(res, code, body, type, cache) {
  res.writeHead(code, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': cache || 'no-store',
  });
  res.end(body);
}

http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';

    const filePath = path.resolve(ROOT, '.' + urlPath);
    if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden');

    const ext = path.extname(filePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const cache = ext === '.html' ? 'no-store' : 'public, max-age=3600';
      return send(res, 200, fs.readFileSync(filePath), TYPES[ext] || 'application/octet-stream', cache);
    }
    if (!ext) {
      // SPA fallback: /pricing, /signin, /signup, ... all serve index.html
      return send(res, 200, fs.readFileSync(path.join(ROOT, 'index.html')), TYPES['.html']);
    }
    return send(res, 404, 'Not found');
  } catch (e) {
    return send(res, 500, String((e && e.message) || e));
  }
}).listen(PORT, () => console.log(`Txlemetry landing on http://localhost:${PORT}`));

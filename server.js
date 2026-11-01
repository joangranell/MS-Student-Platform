const http = require('http');
const fs = require('fs');
const path = require('path');
const { callMcpTool } = require('./scripts/mcp-mslearn');

const PORT = process.env.PORT || 8080;
const HOST = '127.0.0.1'; // Security: strictly bind to localhost only (no 0.0.0.0)
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

// Rate limiting in-memory store (60 req/min per IP)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 60;

function checkRateLimit(ip) {
  const now = Date.now();
  const client = rateLimits.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
  if (now > client.resetTime) {
    client.count = 1;
    client.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    client.count += 1;
  }
  rateLimits.set(ip, client);
  return client.count <= MAX_REQUESTS_PER_WINDOW;
}

const server = http.createServer(async (req, res) => {
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // Security: check rate limit
  if (!checkRateLimit(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'Demasiadas peticiones. Límite de 60 peticiones por minuto alcanzado.' }));
    return;
  }

  const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Security: Live Proxy Endpoint for Microsoft Learn MCP Server
  if (pathname === '/api/mslearn') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    try {
      const action = parsedUrl.searchParams.get('action') || 'search';
      const query = (parsedUrl.searchParams.get('q') || '').trim();
      const lang = (parsedUrl.searchParams.get('lang') || '').trim();
      const targetUrl = (parsedUrl.searchParams.get('url') || '').trim();

      // Action whitelist
      if (!['search', 'code', 'fetch'].includes(action)) {
        res.writeHead(400);
        res.end(JSON.stringify({ ok: false, error: 'Acción no permitida' }));
        return;
      }

      // Input size limits
      if (query.length > 256) {
        res.writeHead(400);
        res.end(JSON.stringify({ ok: false, error: 'Parámetro de búsqueda demasiado largo (máx 256 caracteres)' }));
        return;
      }

      // Security: Strict Whitelist for URL fetch (only learn.microsoft.com)
      if (action === 'fetch') {
        if (!targetUrl || !targetUrl.startsWith('https://learn.microsoft.com/')) {
          res.writeHead(403);
          res.end(JSON.stringify({
            ok: false,
            error: 'Acceso denegado: El proxy solo acepta URLs oficiales de https://learn.microsoft.com/'
          }));
          return;
        }
      }

      let result;
      if (action === 'code') {
        const args = { query };
        if (lang) args.language = lang;
        result = await callMcpTool('microsoft_code_sample_search', args);
      } else if (action === 'fetch') {
        result = await callMcpTool('microsoft_docs_fetch', { url: targetUrl });
      } else {
        result = await callMcpTool('microsoft_docs_search', { query });
      }

      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, data: result }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ ok: false, error: err.message }));
    }
    return;
  }

  // Static files handling with directory traversal protection
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.normalize(path.join(ROOT, relativePath));

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + pathname);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(content);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`\n=============================================================`);
  console.log(` 🚀 MS Student Platform + Live MS Learn MCP ejecutándose en:`);
  console.log(` 👉 http://${HOST}:${PORT}`);
  console.log(` 📄 Documento Funcional: http://${HOST}:${PORT}/documento-funcional.html`);
  console.log(` 🔒 Enlace local seguro vinculado a: ${HOST}`);
  console.log(`=============================================================\n`);
});

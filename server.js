const http = require('http');
const fs = require('fs');
const path = require('path');
const { callMcpTool } = require('./scripts/mcp-mslearn');

const PORT = process.env.PORT || 8080;
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

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Live Proxy Endpoint for Microsoft Learn MCP Server
  if (pathname === '/api/mslearn') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    try {
      const action = parsedUrl.searchParams.get('action') || 'search';
      const query = parsedUrl.searchParams.get('q') || '';
      const lang = parsedUrl.searchParams.get('lang') || '';
      const targetUrl = parsedUrl.searchParams.get('url') || '';

      let result;
      if (action === 'code') {
        const args = { query };
        if (lang) args.language = lang;
        result = await callMcpTool('microsoft_code_sample_search', args);
      } else if (action === 'fetch' && targetUrl) {
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

  // Static files
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.join(ROOT, relativePath);

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
      'Cache-Control': 'no-store'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(` 🚀 MS Student Platform + Live MS Learn MCP ejecutándose en:`);
  console.log(` 👉 http://localhost:${PORT}`);
  console.log(` 📄 Documento Funcional: http://localhost:${PORT}/documento-funcional.html`);
  console.log(`=============================================================\n`);
});

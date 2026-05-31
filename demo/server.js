const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const HTML_FILE = path.join(__dirname, 'chipown-2025-report.html');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(HTML_FILE, 'utf8', (err, data) => {
      if (err) { res.writeHead(500); res.end('Error reading file'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      fs.writeFile(HTML_FILE, body, 'utf8', (err) => {
        if (err) { res.writeHead(500); res.end('Save failed'); return; }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
      });
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Editing and saving will modify: ${HTML_FILE}`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const HTML_FILE = path.join(__dirname, 'chipown-2025-report.html');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(HTML_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err.message);
        res.writeHead(500);
        res.end('Error reading file: ' + err.message);
        return;
      }
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
        if (err) {
          console.error('Error saving file:', err.message);
          res.writeHead(500);
          res.end('Save failed: ' + err.message);
          return;
        }
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
  console.log(`\n  html-ppt-skill demo server\n`);
  console.log(`  File:  ${HTML_FILE}`);
  console.log(`  URL:   http://localhost:${PORT}`);
  console.log(`\n  Open the URL in your browser to view the demo.\n`);
});

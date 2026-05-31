const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const PORT = parseInt(args.find(a => /^\d+$/.test(a)) || '3456', 10);
const HTML_FILE = args.find(a => !a.startsWith('-') && !/^\d+$/.test(a))
  || findFirstHtml(process.cwd());

function findFirstHtml(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  if (files.length === 0) {
    console.error('No .html files found in', dir);
    process.exit(1);
  }
  return path.join(dir, files[0]);
}

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
        res.writeHead(500);
        res.end('Error reading file');
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
          res.writeHead(500);
          res.end('Save failed');
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
  console.log(`\n  html-ppt-skill edit server\n`);
  console.log(`  File:  ${HTML_FILE}`);
  console.log(`  URL:   http://localhost:${PORT}`);
  console.log(`\n  Open the URL in your browser, click the pencil button to start editing.\n`);
});

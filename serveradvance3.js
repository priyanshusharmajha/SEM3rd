const http = require('http');
const { URL } = require('url');

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = requestUrl.pathname;

    console.log(`Request received: ${req.method} ${path}`);

    if (path === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome! Try /greet?name=Rahul, /headers, or POST to /data');
    } else if (path === '/greet' && req.method === 'GET') {
        const name = requestUrl.searchParams.get('name') || 'Guest';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Hello, ${name}! Welcome to the server.`);
    } else if (path === '/headers' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.headers, null, 2));
    } else if (path === '/data' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                message: 'Data received successfully',
                yourData: body
            }));
        });
    } else if (path === '/error') {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Simulated server error (500)');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 - Page Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
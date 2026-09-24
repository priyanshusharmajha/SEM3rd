//https://localhost:3000/greet?name=Rahul
//https://localhost:3000/headers
//https://localhost:3000/
//https://localhost:3000/error
//https://localhost:3000/data


const http=require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedurl= url.parse(req.url, true);
    const path = parsedurl.pathname;
    const query = parsedurl.query;

    console.log(`Request received: ${req.method} ${path}`);

    if (path === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('X-powered-by', 'plain-node-http');
        res.end('Welcome! Try /greet?name=Rahul, /headers, or POST to /data');
    } else if (path === '/greet' && req.method === 'GET') {
        const name = query.name || 'Guest';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Hello, ${name}! Welcome to the server.\n`);
    }
    else if (path === '/headers' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.headers, null, 2));
    }
   else if(path === '/data' && req.method === 'POST'){
        let body = '';
        req.on('data', chunk => { body += chunk;});
        req.on('end',()=>{
            res.statusCode = 201;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({message: 'data received successfully', yourData: body}));
        });
   }
   else if(path === '/error'){
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Simulated server error (500)\n');
   }
   else {
        res.statusCode = 404;
        res.setHeader('content-type', 'text/plain');
        res.end('404 - Page Not Found\n');
   }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
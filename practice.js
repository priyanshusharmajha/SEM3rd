const http = require('http');

const server = http.createServer((req, res) => {

    if(req.url==='/'){
        res.end('home page');
    }

    else if(req.url==='/about'){
        res.end('about page');
    }

    else if(req.url==='/students'){
        res.end('students page');
    }
    else if(req.url=== '/contact'){
        res.end('contact page');
    }
    else if(req.url==='/error'){
        res.statusCode=500;
        res.end('error page');
    }
    else{
        res.statusCode=404;
        res.end('page not found');
    }
});
server.listen(3000,()=>{
    console.log('server is running on http://localhost:3000');
});
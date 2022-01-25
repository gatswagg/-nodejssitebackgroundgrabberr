const http = require('http');
const url = require('url');
const {screenshot} = require("./lib/screenshot");
const {readFile} = require("./lib/read-file");

const handler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    
    const parsedUrl = url.parse(req.url, true);

    switch (parsedUrl.pathname) {
        case '/':
            res.writeHead(200, {'Content-type':'text/plain'});
            return res.end('Hello, I am a webserver !');
        case '/screenshot':
            const website = parsedUrl.query.website;
            if(!website) {
                res.writeHead(400, {'Content-type':'text/plain'});
                return res.end('Please provide a website');
            }
            return screenshot(website, err => {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/plain'});
                    return res.end(JSON.stringify(err));
                }
                return readFile('bg.jpeg', res);
            });
        default:
            res.writeHead(404, {'Content-type':'text/plain'});
            return res.end('Page not found');
    }
}

const server = http.createServer(handler);
server.listen(3000);
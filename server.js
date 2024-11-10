const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                // Error handling: if `index.html` cannot be read, respond with a 404 error
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found: Unable to load index.html');
                console.error('Error reading index.html:', err); // Logs the error details to the server console
            } else {
                // If no error, serve the content of `index.html`
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        // Handling non-existent routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: Page does not exist');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


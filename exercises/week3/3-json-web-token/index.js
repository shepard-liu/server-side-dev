const app = require('./app');

const http = require('http');

const server = http.createServer(app);

server.listen('3000', 'localhost', (err) => {
    if (err)
        console.log('server not running');
    else
        console.log('server is running');
});
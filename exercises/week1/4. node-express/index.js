
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const hostname = "localhost";
const port = 4000;
const dataPath = __dirname + "/data";

const app = express();

app.use(morgan('dev'));
app.use(express.static(dataPath));
app.use(
    (req, res, next) => {
        console.log(res.header);
        //default response
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html');

        fs.open(`${dataPath}/index.html`, 'r',
            (err, fd) => {
                if (!err)
                    fs.createReadStream(`${dataPath}/index.html`).pipe(res);
                else
                    console.log(err);
            });
    }
)

const server = http.createServer(app);

server.listen(port, hostname,
    () => {
        console.log('Server starts listening.');
    })
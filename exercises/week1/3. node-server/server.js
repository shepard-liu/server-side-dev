
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Console } = require('console');

const hostname = "localhost";
const port = 4000;

const server = http.createServer(
    function (req, res) {
        console.log("Receiving request[Url: " + req.url + " Method: " + req.method);

        //Processing GET Request
        if (req.method == 'GET') {
            //Add index.html automatically
            var fileURL = req.url;
            if (fileURL == '/')
                fileURL += 'index.html';

            //Convert the url to local path
            var filePath = './data' + fileURL;

            //Open filestream for html request
            if (path.extname(filePath) == '.html') {
                fs.open(filePath, 'r',
                    (err, fd) => {
                        if (err) {
                            console.log(err);
                            res.statusCode = 404;
                            res.setHeader('Content-Type', 'text/html');
                            fs.createReadStream('./data/404page.html').pipe(res);
                        }
                        else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/html');
                            fs.createReadStream(filePath).pipe(res);
                        }
                    });
            }
            //Don't accept request for other format of file
            else {
                res.statusCode = 406;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream('./data/406page.html').pipe(res);
            }

        }
        //Don't accept other request method
        else {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./data/405page.html').pipe(res);
        }
    });

server.listen(port, hostname,
    () => {
        console.log('Server starts listening.');
    })
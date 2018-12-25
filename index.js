var http = require('http');
var fs = require('fs');
var email = require('./email.js')

http.createServer(function (req, res) {
    try {
        console.log('req.url : ' + req.url);

        if(req.url === '/') {
            fs.readFile('./public/index.html', 'UTF-8', function(err, data){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
        }
        else if(req.url === '/email') {
            let body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
    
            req.on('end', function () {
                console.log('incoming email : ' + body);

                body = JSON.parse(body);
                email.sendEmail(body.name, body.email, body.message);

                res.writeHead(200);
                res.end(JSON.stringify({status: 200, success: 'email sent'}));
            });
        } else {
            fs.readFile('./public/' + req.url, function(err, data) {
                if(!err) {
                    var dotoffset = req.url.split('?')[0].lastIndexOf('.');
                    var mimetype = dotoffset == -1
                    ? 'text/plain'
                    : {
                        '.html' : 'text/html',
                        '.ico' : 'image/x-icon',
                        '.jpg' : 'image/jpeg',
                        '.png' : 'image/png',
                        '.gif' : 'image/gif',
                        '.svg' : 'image/svg+xml',
                        '.css' : 'text/css',
                        '.js' : 'text/javascript',
                        '.ttf' : 'application/x-font-ttf',
                        '.otf' : 'application/x-font-otf',
                        '.woff' : 'application/x-font-woff',
                        '.woff2' : 'application/x-font-woff',
                        '.eot' : 'application/vnd.ms-fontobject'
                        }[ req.url.substr(dotoffset) ];
                    res.writeHead(200, {'Content-Type': mimetype});
                    res.end(data);
                } else {
                    res.writeHead(302, {'Location': '/'});
                    res.end();
                }
            });
        }
    }
    catch(err) {
        console.log('server error');
        console.log(err);
    }
}).listen(process.env.PORT || 80, function() {
    console.log('server running on port 80..');
});
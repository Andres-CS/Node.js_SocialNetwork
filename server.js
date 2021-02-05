var http = require('http');
var fs = require('fs');
var path = require('path');

var files = {};
var port = 3000;
var host = '0.0.0.0';

// ------------------



// ------------------

var assets = function (req, res){
    //...
    var sendError = function(message,code){
        if (code === undefined){ code = 404; }
        res.writeHead(code,{'Content-Type':'text/html'});
        res.end(message);
    }
    
    var serve = function(file){
        var contentType;
        switch(file.ext.toLowerCase()){
            case 'css': 
                contentType = "text/css";
                break;
            case 'html':
                contentType = "text/html";
                break;
            case 'js':
                contentType = "text/js";
                break;
            case 'ico':
                contentType = "text/ico";
                break;
            case 'json':
                contentType = "text/json";
                break;
            case 'jpg':
                contentType = "text/jpg";
                break;
            case 'png':
                contentType = "text/png";
                break;
            default:
                contentType = "text/plain";
        }
        res.writeHead(200,{'Content-Type':contentType});
        res.end(file.content);
    }
    
    var readFile = function(filePath){
        if(files[filePath]){ serve(files[filePath]); }
        else{
            fs.readFile(
                filePath, 
                function(err,data){
                    if(err){ 
                        sendError('Error reading ' + filePath + '.'); 
                        return;
                    }
                    files[filePath] = {
                        ext : filePath.split(".").pop(),
                        content: data
                    };
                    serve(files[filePath]);
                }
            );
        }
    }
    
    readFile(path.normalize(__dirname + req.url));
}

var app = http.createServer(assets).listen(port,host);
console.log("Listening on " + host + ":" + port);

// ----------------


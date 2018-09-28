var http = require('http');
var router = require('./views/router');
http.createServer(function(req,res){
    //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    if(req.url !== '/favicon.ico'){
        //files.readFileSync(response);
        //files.readFile('./templates/main.html',response);
        //response.end();
        //router.home(res);
        //console.log(req.url);
        var path=req.url.split('?')[0].replace(/\//,'');
        //console.log(path);
        try{
            router[path](req,res);
        } catch(e){
            //router['home'](res);
        }
       
        //res.end();
    }
}).listen(3000,'127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');
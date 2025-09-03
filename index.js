const http= require("http");
const fs= require("fs");

const myServer= http.createServer((req, res)=>{
    const log= `${Date.now()}: New Req Received\n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(req.ur){
            case '/': res.end("HomePage");
            break;
            case'/about':res.end("This is a http server");
            break;
            default:
                res.end("404 not found")
        }
    })
})
myServer.listen(8000,()=> console.log("server started"))
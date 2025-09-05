const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const myUrl = url.parse(req.url, true);

    const log = `${new Date().toISOString()} [${req.method}] ${myUrl.pathname}\n`;

    fs.appendFile("log.txt", log, (err) => {
        if (err) console.error("Error writing log:", err);
    });

    switch (myUrl.pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Home Page");
            break;

        case "/about":
            const username = myUrl.query.myname || "Guest";
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Hi, ${username}`);
            break;

        case "/search":
            const search = myUrl.query.search_query || "nothing";
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Here are your results for: ${search}`);
            break;

        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
    }
});

myServer.listen(8000, () => console.log("🚀 Server started on port 8000"));

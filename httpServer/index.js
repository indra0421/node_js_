const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(request.url);
    if (req.url == "/") {
        res.end("hello from the HOME side");
    } else if (req.url == "/about") {
        res.end("hello from about us side");
    }
    else if (req.url == "/contact") {
        res.end("hello from contact us side");
    } else {
        res.writeHead(404, { "Content-type": "text/html" })
        res.end("<h1> eror 404 | page does not exist </h1>")
    }


});

server.listen(3000, '127.0.0.1', () => {
    console.log("listening to the port no 8000");
})

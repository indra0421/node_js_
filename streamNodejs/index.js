const fs = require("fs");
const http = require('http');

const server = http.createServer();
//--------------------------------------------
//without stream normallly
// server.on('request', (req, res) => {

//     fs.readFile('input.txt', (err, data) => {
//         if (err) return console.eror(err);
//         res.end(data.toString());
//     })
// })
//---------------------------------------------
//2nd way with stream
// server.on('request', (req, res) => {

//     //reading the file
//     const rstream = fs.createReadStream('input.txt'); 

//     //storing the data chunk by chunk
//     rstream.on('data', (chunkData) => {
//         res.write(chunkData);
//     });

//     //when the data read is over -- no more data to read
//     //its shows the data
//     rstream.on('end', () => {
//         res.end();
//     });

//     //if there is any eror present
//     rstream.on("eror", (err) => {
//         console.log(err);
//         res.end("file not found")
//     })

// })
//-----------------------------------------
//3rd way using stream pipes
server.on('request', (req, res) => {
    const rstream = fs.createReadStream('input.txt');
    rstream.pipe(res)
     
})



server.listen(8000, '127.0.0.1'); 0
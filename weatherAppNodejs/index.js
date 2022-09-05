const http = require('http');
const fs = require('fs');
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempval, orgval) => {
    temprature = tempval.replace("{%tempVal%}", orgval.main.temp);
    temprature = temprature.replace("{%tempMin%}", orgval.main.temp_min);
    temprature = temprature.replace("{%tempMax%}", orgval.main.temp_max);
    temprature = temprature.replace("{%location%}", orgval.name);
    temprature = temprature.replace("{%country%}", orgval.sys.country);
    temprature = temprature.replace("%tempStatus%", orgval.weather[0].main);

    return temprature;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=fed5b93d2334eb86b67b9dfd6c3a5177",)
            .on('data', (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                console.log(arrData);
                // console.log(arrData[0].main.temp);
                const realTimeData = arrData
                .map(val => replaceVal(homeFile, val))
                .join("");            //Converting the array to string 

                res.write(realTimeData);
                // console.log(realTimeData);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end(); //when there is no more data to read -- must use
            });

    }
})

server.listen(3000, "127.0.0.1");
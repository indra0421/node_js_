const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const http = require("http");
const socketio = require("socket.io");
const { getMessage} = require('./utils/message')
const {addUser, getUser,removeUser, getUserListInChannel} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicPathDirectory = path.join(__dirname, "../public");
app.use(express.static(publicPathDirectory));

io.on("connection", (socket) => {

    socket.on('join', ({username,channel},callback) =>{
        const {user,error} = addUser(socket.id,username,channel)
        if(error) {
            return callback(error);
        }

        socket.join(channel);
        io.to(channel).emit('sidebarInfo',{
            channel,
            users: getUserListInChannel(channel)
        });

        socket.emit('recievedMessage', getMessage('SYSTEM:','WELCOME'));
        socket.broadcast.to(channel)
            .emit("recievedMessage", getMessage('SYSTEM:',`${username} is Connected`));

    });

  socket.on("sendMessage", (text, callback) => {
      const user = getUser(socket.id);
    if (text === "HELLO") {
      return callback(false);
    }
    io.to(user.channel).emit("recievedMessage", getMessage(user.username,text));
    callback(true);
  });

  socket.on("sendLocation", ({latitude,longitude}) => {
      const {username, channel} = getUser(socket.id);
      const url = `http://maps.google.com?q=${latitude},${longitude}`
    io.to(channel).emit("recievedMessage", 
        getMessage(username, undefined,url));
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);  
    if (user){
        const {username,channel} = user;
        io.to(channel).emit('sidebarInfo',{
            channel,
            users: getUserListInChannel(channel)
        });
      io.to(channel).emit("recievedMessage", getMessage('SYSTEM:',`${username} LEFT`));
    }
});

});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});



/*
//////GENEL OLARAK//////////
io.emit = tüm bağlı socketlere yollar 
socket.emit = belli sockettekki kişilere mesajı yollar (bağlandığımız socketten bize hoşgeldiniz yazması)
socket.broadcast.emit = bu socket haricindeki herkese gönder (user left, user joined  gibi)

/////KANALLAR İŞİN İÇİNE GİRDİĞİNDE////////
io.to.emit = kanala bağlanan kişiye mesajı gönder 
socket.broadcast.to.emit = bu socket dışındaki kişilere mesajı gönder

*/
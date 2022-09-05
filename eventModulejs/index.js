const EventEmitter = require('events');

const event = new EventEmitter();

// 1. registering for the event to be fired only one time using once using .on and .emit
// event.on('sayMyName', () => {
//   console.log("your name is indranil");
// })

// event.emit('sayMyName');

// 2. create an event emiter instance anf register a couple of callbacks 

// event.on('sayMyName', () => {
//     console.log("your name is indranil");
//   })
//   event.on('sayMyName', () => {
//     console.log("your name is naskar");
//   })
//   event.on('sayMyName', () => {
//     console.log("your name is pal");
//   })

//   event.emit('sayMyName');

//   3. Registering for the event with callback parameters

event.on('checkPage',(sc,msg,port) => {
    console.log(`status code is ${sc}`);
    console.log(msg);
    console.log(`and the server port is ${port}`);
})

event.emit('checkPage', 200, "ok" , 8000);


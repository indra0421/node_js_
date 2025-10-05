const fs = require("fs");

// // fs.writeFile("read.txt","i am indranil",(eror)=>{
// //     console.log('file created');
// //     console.log(eror)
// // })

fs.readFile('read.txt','utf8',(eror,data) => {
  console.log(data);
  console.log(eror)
})

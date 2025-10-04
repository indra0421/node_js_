const fs = require("fs");

const bioData = {
    name: "indranil",
    age: 20,
    hobby: "cricket"
};

// // 1 : convert it to JSON
// // 2 : add it in a second File
// // 3 : readfile
// // 4 : again convert back to js obj crossOriginIsolated
// // 5 : show in console

const jsonData = JSON.stringify(bioData);

fs.writeFile('json1.json', jsonData , (eror) => {
  console.log("done")
})

fs.readFile("json1.json","utf-8",(err,data)=>{
//  console.log(data);
 const objData = JSON.parse(data);
 console.log(objData);
})




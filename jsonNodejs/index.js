const fs = require("fs").promises;

const bioData = {
  name: "indranil",
  age: 20,
  hobby: "cricket",
};

async function processJSON() {
  try {
    const jsonData = JSON.stringify(bioData);

    await fs.writeFile("json1.json", jsonData);
    console.log("Data written to file");

    const data = await fs.readFile("json1.json", "utf-8");

    const objData = JSON.parse(data);


    console.log("Parsed Object:", objData);
  } catch (error) {
    console.error("Error:", error);
  }
}

processJSON();

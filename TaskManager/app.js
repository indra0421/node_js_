const readline = require('readline'); // using require instead of import

// creating readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// creating an empty array to store tasks
const todos = [];

const showMenu = () => {
    console.log("\n1. Add a Task...");
    console.log("2. View Existing Tasks");
    console.log("3. Exit");
    rl.question("Choose one option from the menu: ", handleInput);
};

const handleInput = (option) => {
    if (option === "1") {
        rl.question("Enter a new Task: ", (task) => {
            todos.push(task);
            console.log("Task Added Successfully:", task);
            showMenu();
        });
    } else if (option === "2") {
        console.log("\nYour Todo List:");
        todos.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
        showMenu();
    } else if (option === "3") {
        console.log("You have exited the program...");
        rl.close();
    } else {
        console.log("Please select options from 1-3");
        showMenu();
    }
};

showMenu();

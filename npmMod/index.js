const chalk = require('chalk');
const validator = require('validator');
// console.log(chalk.blue('indra'));
// console.log(chalk.blue.underline('indra'));
// console.log(chalk.green.underline.inverse('hello world'));

const res = validator.isEmail('indragmail.com')
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));

const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('ssss@gmail.com'));
console.log(validator.isURL('https://google.com'));
console.log(chalk.blue.inverse.bold('Hello world!'));
const validator = require('validator');
const getNotes = require('./notes');
const chalk = require('chalk');

const notes = getNotes()

console.log(chalk.green.bold.inverse(notes));
console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));

console.log(validator.isEmail('anthony@example.com'))
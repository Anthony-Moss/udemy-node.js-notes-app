const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Customize yargs
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            // must provide this arg now or it wont run
            demandOption: true,
            // title must be a string or it wont run
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
        // console.log('Title: ' + argv.title
        //             + 'Body: ' + argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            // must provide this arg now or it wont run
            demandOption: true,
            // title must be a string or it wont run
            type: 'string'
        }
    },
    handler: function (argv) {
        const saved = notes.removeNote(argv.title)

        // alt way to do the console logging in app.js not notes.js
        // if (saved) {
        //     console.log(chalk.inverse.green(`Removing the note titled: ${argv.title}!`))
        // } else {
        //     console.log(chalk.inverse.red(`Couldnt find note with ${argv.title} title`))
        // }
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note!')
    }
})

// Create  list command
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: function () {
        console.log('Listing all the notes')
    }
})

// does kinda same thing as yargs.parse() but shows on console
// console.log(yargs.argv)

yargs.parse()

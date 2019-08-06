const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes are...'
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green(`Note created with title: ${title}!`))
    } else {
        console.log(chalk.inverse.red(`${title} is taken, please use a different title.`))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = function (title) {
    let notes = loadNotes();
    try {
        const noteExist = notes.filter(function (note) {
            return note.title === title
        })
        if (noteExist.length === 1) {
            const notesToKeep = notes.filter((note) => {
                return note.title !== title
            })
            saveNotes(notesToKeep)
            return title
        } else {
            return null
        }
    } catch (e) {
        return null
    }
} 

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
module.exports = {
    getNotes,
    addNote,
    removeNote
}
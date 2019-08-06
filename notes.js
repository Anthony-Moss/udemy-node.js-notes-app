const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes are...'
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
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

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    let notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse(`Note ${title} removed!`))
        saveNotes(notesToKeep)
    } else{
        console.log(chalk.red.inverse(`No note with ${title} found!`))
    }
} 

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        const notes = JSON.parse(dataJSON)
        return notes
    } catch (e) {
        return []
    }
}
module.exports = {
    getNotes,
    addNote,
    removeNote,
    loadNotes
}
const fs = require('fs')
const chalk = require('chalk');
const getNotes =()=> 'Your notes....'

const addNote = (title,body)=>{
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)
    if(duplicateNotes.length === 0){
        notes.push(
            {
                title:title,
                body:body
            }
        )
        saveNotes(notes)
        
        console.log("Notes added");
    }else{
        console.log('Note title taken')
    }
    
}

const removeNote = (title) =>{
    const notes = loadNotes()
    const removeNotes = notes.filter((note,index) => {
        if(note.title === title){
            notes.splice(index, 1);
            return true
        }
    })
    if(removeNotes.length > 0){
        
        saveNotes(notes)
        
        console.log("Notes Removed");
    }else{
        console.log('Notes not exist')
    }
    console.log(notes);
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}   

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }

}
const listNotes = () =>{
    const notes = loadNotes()
    notes.forEach((notes)=>{
        console.log(chalk.red("Your notes"),notes.title)
    });
}
module.exports = { 
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes
} 

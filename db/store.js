const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

// add uuid also 


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(){
        return readFileAsync("db/db.json", "utf8");
    }

    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    
    getNotes(){
        return this.read().then((notes)=> {
            let parsedNotes;

            try{
                parsedNotes = [].concat(JSON.parse(notes));
            }catch(err){
                parsedNotes = []
            }

            return parsedNotes;
        }
        )
    }

    addNote(note){
        const { title,text } = note; 
        if(!title || !text){
            throw new Error ("you must write a note, silly")
        }
        const newNote = { title, text, id: uuidv1()};
    // we are tryign to ger all the note, add new note, write updated notes, return the new note 

    return this.getNotes()
    .then((notes)=> [...notes, newNote])
    .then((updatedNotes)=> this.write(updatedNotes))
    .then(()=> newNote)
    }

    deleteNote(id) {
        return this.getNotes()
        .then((notes)=> notes.filter((note)=> note.id !== id))
        .then((filteredNotes)=> this.write(filteredNotes))
    }
    
}

module.exports = new Store()



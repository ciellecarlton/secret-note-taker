const app = require('express').Router();
const store = require('../db/store');


// routes

app.get("/notes", function (req, res) {
    store.getNotes().then((notes) => res.json(notes)); 
});

app.post("/notes", function (req, res) {
    store.addNote(req.body).then((note) => res.json(note)); 
})

app.delete("/notes/:id", function (req, res){
    console.log(req)
    store.deleteNote(req.params.id).then(() => res.json({ok:true}))
})


// // Setup the /api/notes post route
// app.post("/api/notes", function (req, res) {
//     // Receives a new note, adds it to db.json, then returns the new note
//     let newNote = req.body;
//     // notes.push(newNote);
//     updateDb(newNote);
//     console.log(newNote)
//     return console.log("Added new note: " + newNote.title);
// });

// // Retrieves a note with specific id
// app.get("/api/notes/:id", function (req, res) {
//     // display json for the notes array indices of the provided id
//     res.json(notes[req.params.id]);
// });

// // Deletes a note with specific id
// app.delete("/api/notes/:id", function (req, res) {
//     notes.splice(req.params.id, 1);
//     updateDb();
//     console.log("Deleted note with id " + req.params.id);
// });


 module.exports = app;



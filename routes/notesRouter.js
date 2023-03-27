const notesRoutes = require('express').Router();
const fs = require('fs');

//uuidv4 creates v4 UUIDs.
const { v4: uuidv4 } = require('uuid');
// Importing the database 
const db = require('../db/db.json');
// changes the notes info into json
apiRouter.get('/notes', (req, res) => res.json(db));
//posts the note info inculding txt and title 
apiRouter.post('/notes', (req, res) => {
    if(req.body.title && req.body.text){
     let currentNote = 
        {
         id: uuidv4(),
         title: req.body.title,
         text: req.body.text
        };
        //adds the Current note to file creating new note
        db.push(currentNote);
    fs.writeFile('./db/db.json', JSON.stringify(db, null, ''), (err) => 
    {
    err ? console.error(err) : res.json(db);
    console.log('You have added a new Note!')
    });
   }
})
// deletes a note entry as user desires 
apiRouter.delete('/notes/:id', (req, res) => {
    const deleteNoteId = req.params.id
    for(let i = 0; i < db.length; i++){
        if(deleteNoteId === db[i].id){
            db.splice(i, 1);
            fs.writeFile('./db/db.json', JSON.stringify(db, null, ''), (err) => {
             err ? console.error(err) : res.json(db);
             console.log('You have deleted your Note!')
      });
    }
  }
})
module.exports = notesRoutes;
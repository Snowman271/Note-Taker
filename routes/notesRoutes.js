const notesRouter = require('express').Router();
const fs = require('fs');

//uuidv4 creates v4 UUIDs.
const { v4: uuidv4 } = require('uuid');
// Importing the database 
const db = require('../db/db.json');
// changes the notes info into json
notesRouter.get('/notes', (req, res) => res.json(db));
//posts the note info inculding txt and title 
notesRouter.post('/notes', (req, res) => {
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


//handeling delete requests
notesRouter.delete('/:id', (req, res) => {
  const deleteId = req.params.id;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) 
      {
          console.error(err);
      } 
      else 
      {
          const parsedData = JSON.parse(data);
      parsedData.forEach((note, i) => {
         if (deleteId === note.id) 
         {
          // removes specific index file
          parsedData.splice(i, 1);
         }
          })
          let json = JSON.stringify(parsedData, null, 2);
          fs.writeFile('./db/db.json', json, err => {
              if (err) 
              {
                  console.error(err);
                  res.status(500).send(err)
              } 
              else
              {
                  res.status(200).send('successful deletion')
              }
          })
      }
  });    
});

module.exports = notesRouter;
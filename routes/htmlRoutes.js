const htmlRoutes = require('express').Router();

const path = require('path');
// puts you in the notes based on directory name
htmlRoutes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});
// send file info html via get route based off of directory name
htmlRoutes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
module.exports = htmlRoutes;
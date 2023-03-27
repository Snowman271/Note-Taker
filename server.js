const express = require('express');
// Import the routers
const htmlRouter = require('./routes/htmlRouter');
const notesRouter = require('./routes/notesRouter');
//sets up current port or port 3001 if fails
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// methods to find the path of routes
app.use('/note', notesRouter);
app.use('/', htmlRouter);

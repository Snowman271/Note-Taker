// Import Express
const express = require('express');
const PORT = process.env.PORT || 3001;
const htmlRouter = require('./routes/htmlRoutes');
const notesRouter = require('./routes/notesRoutes');

const app = express();

// giving the middleweat acceass to files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/notes', notesRouter);
app.use('/', htmlRouter);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
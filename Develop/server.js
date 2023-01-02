const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index.js');
const savedNotes = require('./db/db.json');

// Defines port
const PORT = process.env.PORT || 3001;

const app = express();

// Imports middleware from cLog
app.use(clog);

app.use('/api', api);

// GET Route for Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for Landing page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET for notes api
app.get('/api/notes', (req, res) => res.json(savedNotes));

// POST for notes api
app.post('/api/notes', (req, res) => res.json(savedNotes));

// Local Server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
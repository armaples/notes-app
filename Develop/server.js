const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('.routes/index.js');

// Defines port
const PORT = process.env.PORT || 3001;

const app = express();

// Imports middleware from cLog
app.use(clog);

app.use('/api', api);

// GET Route for Landing page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard Route for 404 Page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
);

// Local Server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const savedNotes = require('./db/db.json');

// Defines port
const PORT = process.env.PORT || 3001;

const app = express();

// Imports middleware from cLog
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// GET Route for Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for retrieving saved notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
            console.info(JSON.parse(data));
        };
});
});

// GET Route for getting a specific note
app.get('/api/notes/:id', (req, res) => {
    if (req.params.id) {
        console.info(`${req.method} request received to get specific note.`);
        const noteId = req.params.id;
        for (let i = 0; i < savedNotes.length; i++) {
            const activeNote = savedNotes[i];
            if (activeNote.id === noteId) {
                res.json(activeNote);
                return;
            }
        }
        res.status(404).send('Note not found');
    }
})

// POST Route for saving new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to save a note.`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4), 
                    (writeErr) =>
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully saved to notes.')
                );
            }
        })

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error saving note.');
    }
});

// DELETE Route for if you want to delete a note
app.delete('/api/notes/:id', (req, res) => {
    res.send("DELETE Request Called");

    //recieve query parameter that contains id of note to delete

    // read all notes
    // remove note with specific id
    // rewrite db.json file
})

// GET Route for Landing page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Local Server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
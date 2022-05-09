// Filesystem function node-module
const fs = require('fs');
// Back-end function node-module
const express = require('express');
// Routing function node-module
const path = require('path');
//  Access database
const db = require('./db/db.json');
// use port localhost3001 OR a container-based platform like HEROKU
const PORT = process.env.PORT || 3001;
// app function node-module through Express.js
const app = express();


// Middleware: parse incoming request Object into string & array
app.use(express.urlencoded({ extended: true }));
// Middleware: parse incoming json
app.use(express.json());
// Middleware: serves static files in dir/public
app.use(express.static('public'));


// GET requests fetches data
app.get('/api/notes', (req, res) => {
    // reads server, return content
    const dbNotes = fs.readFileSync(path.join(__dirname, './db/db.json'));
    // JSON parse content
    const dbParse = JSON.parse(dbNotes);
    // Respond JSON content
    res.json(dbParse);
});


// POST requests submits data
app.post('/api/notes', (req, res) => {
    // reads server, return content
    const dbNotes = fs.readFileSync(path.join(__dirname, './db/db.json'));
    // JSON parse content
    const dbParse = JSON.parse(dbNotes);
    // stringified-JSON-content needs ID#.  "new Date().valueOf();" generates a unique number
    req.body.id = new Date().valueOf();
    // pushes stringified-JSON-content, Express.js object
    dbParse.push(req.body);
    // writes stringified-JSON-content into server
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(dbParse));
    // JSON respond
    res.json();
});


// absolute path directly to note.html with res.sendFile
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// absolute path directly to index.html with res.sendFile
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// Wildcard route absolute path directly to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// start server and listens on port 3001
app.listen(PORT, () => {
    console.log('API server now on port ${PORT}');
});
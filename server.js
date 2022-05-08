// Filesystem function node-module
const fs = require('fs');

// Back-end function node-module
const express = require('express');

// Routing function node-module
const path = require('path');

// use port localhost3001 OR a container-based platform like HEROKU
const PORT = process.env.PORT || 3001;

// app function node-module through Express.js
const app = express();


// Middleware: parse incoming request Object into string & array
app.use(express.urlencoded({ extended:true }));
// Middelware: parse incoming json
app.use(express.json());
// Middleware: serves static files in dir/public
app.use(express.static('public'));


// absolute path directly to note.html with res.sendFile
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// absolute path directly to index.html with res.sendFile
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// Wildcard route absolute path directly to index.html..
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



// start server and listens on port 3001
app.listen(PORT, () => {
    console.log('API server now on port ${PORT}');
});
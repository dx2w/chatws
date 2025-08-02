const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/list', (req, res) => {
    const listPath = path.join(__dirname, 'public', 'src', 'list');
    fs.readFile(listPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading list file:', err);
            res.status(500).send('Error reading Pokemon list');
            return;
        }
        res.type('text/plain').send(data);
    });
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'err', 'err01.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
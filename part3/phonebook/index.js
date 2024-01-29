const express = require('express');
let data = require('./db.json');
const app = express();
const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get('/api/persons', (req, res) => {
    res.json(data);
});

app.get('/info',(req, res) => {
    const body = `
        <p>Phonebook has info for ${data.length} people</p>
        <p>${new Date().toString()}</p>`
    res.status(200).send(body);
})



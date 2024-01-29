const express = require('express');
let data = require('./db.json');
const app = express();
const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get('/api/persons', (req, res) => {
    res.json(data);
})


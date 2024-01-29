const express = require("express");
let data = require("./db.json");
const app = express();
const PORT = 3001;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get("/info", (req, res) => {
  const body = `
        <p>Phonebook has info for ${data.length} people</p>
        <p>${new Date().toString()}</p>`;
  res.status(200).send(body);
});
/* start of persons endpoint */
app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = data.find((person) => person.id === id);
  if (!person) res.status(404).send(`No records found for ID ${id}`);
  else res.status(200).json(person);
});

/* end of persons endpoint */

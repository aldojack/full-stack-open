const express = require("express");
let data = require("./db.json");
const app = express();
const PORT = 3001;

app.use(express.json());

let personDb = [...data]

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get("/info", (req, res) => {
  const body = `
        <p>Phonebook has info for ${personDb.length} people</p>
        <p>${new Date().toString()}</p>`;
  res.status(200).send(body);
});
/* start of persons endpoint */
app.get("/api/persons", (req, res) => {
  console.log(personDb);
  res.json(personDb);
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = personDb.find((person) => person.id === id);
  if (!person) res.status(404).send(`No records found for ID ${id}`);
  else res.status(200).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id;

  const personToDelete = personDb.find((person) => person.id === id);

  if (!personToDelete) res.status(404).send(`No records found for ID ${id}`);
  else {
    // personDb = personDb.filter(person => person.id !== personToDelete.id)
    const findPerson = personDb.indexOf(personToDelete)
    personDb.splice(findPerson,1);
    res.status(204).end();
  };
});

/* end of persons endpoint */

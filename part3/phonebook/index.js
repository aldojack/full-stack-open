const express = require("express");
let data = require("./db.json");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(express.json());
app.use(cors());
morgan.token('body', (req, res)=> {
  if(req.method === 'POST'){
    return JSON.stringify(req.body);
  }
})
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

let personDb = [...data];


app.get("/info", (req, res) => {
  const body = `
        <p>Phonebook has info for ${personDb.length} people</p>
        <p>${new Date().toString()}</p>`;
  res.status(200).send(body);
});
/* start of persons endpoint */
app.get("/api/persons", (req, res) => {
  res.json(personDb);
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = personDb.find((person) => person.id === id);
  if (!person) res.status(404).send(`No records found for ID ${id}`);
  else res.status(200).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;

  const personToDelete = personDb.find((person) => person.id === id);

  if (!personToDelete) res.status(404).send(`No records found for ID ${id}`);
  else {
    const findPerson = personDb.indexOf(personToDelete);
    personDb.splice(findPerson, 1);
    res.status(204).end();
  }
});

function validatePerson(req, res, next) {
  const { body } = req;
  //If name or number is missing from request then return 400 status code
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number value" });
  }
  //check if name exists
  const nameExists = personDb.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );
  //If a record is found then return 400 status code with message that name already exists
  if (nameExists)
    res.status(400).json({ error: `${body.name} already exists` });
  //else move on to add to DB
  else next();
}

app.post("/api/persons", validatePerson, (req, res) => {
  const newPerson = { id: Math.floor(Math.random() * 10000), ...req.body };
  personDb = personDb.concat(newPerson);
  return res.status(201).json(newPerson);
});

/* end of persons endpoint */

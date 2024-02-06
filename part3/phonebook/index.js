const express = require("express");
const Person = require("./model/person");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
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

app.get("/info", async (req, res) => {
  let totalPeople = await Person.find({}).then((results) => {
    return results.length;
  });
  const body = `
        <p>Phonebook has info for ${totalPeople} people</p>
        <p>${new Date().toString()}</p>`;
  res.status(200).send(body);
});

/* start of persons endpoint */
app.get("/api/persons", (req, res, next) => {
  Person.find({}).then((collection) => {
    res.json(collection);
  })
  .catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {

  Person.findById(req.params.id)
    .then((personFound) => res.json(personFound))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {

  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

function validatePerson(req, res, next) {
  const { body } = req;
  //If name or number is missing from request then return 400 status code
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number value" });
  }
  else next();
}

app.post("/api/persons", validatePerson, (req, res, next) => {
  // const newPerson = { id: Math.floor(Math.random() * 10000), ...req.body };
  const newPerson = new Person({
    ...req.body
  });
  newPerson.save()
  .then(res.status(201).json(newPerson))
  .catch(error => next(error))
});

app.put("/api/persons/:id", (req, res, next) => {
  const updatedPerson = req.body;
  Person.findByIdAndUpdate(req.params.id, updatedPerson)
  .then(result => res.status(201).json(result))
  .catch(error => next(next));
})

/* end of persons endpoint */

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } 

  next(error);
}

const unknownEndpoints = (req, res) => {
  res.status(404).send({error: 'Unknown endpoint'});
}
app.use(errorHandler);
app.use(unknownEndpoints);
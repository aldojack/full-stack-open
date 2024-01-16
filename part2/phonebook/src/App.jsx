import { useState } from "react";
import "./app.css";

function App() {
  const [people, setPeople] = useState([
    { name: "Arto Hellas", number: "+447445121" },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const addNewPerson = {...newPerson};
    const alreadyExists = people.find(
      (person) => person.name === addNewPerson.name || person.number === addNewPerson.number
    );
    if (!alreadyExists) {
      setPeople(people.concat(addNewPerson));
    } else {
      alert(`${addNewPerson.name} is already added to phonebook`);
    }
  };


  const renderedPeople = people.map((person) => (
    <p key={person.name}>
      {person.name}: {person.number}
    </p>
  ));

  return (
    <div>
      <form onSubmit={handleAdd}>
        <fieldset>
          <legend>Phonebook</legend>
          <div className="form-group">
            <label htmlFor="nameInput">name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newPerson.name}
              onChange={handleChange}
            />
            <div className="form-group">
              <label htmlFor="numberInput">number:</label>
              <input
                type="text"
                id="number"
                name="number"
                value={newPerson.number}
                onChange={handleChange}
              />
            </div>
            <button type="submit">add</button>
          </div>
        </fieldset>
      </form>
      <h2>Numbers</h2>
      <div>{renderedPeople}</div>
    </div>
  );
}

export default App;

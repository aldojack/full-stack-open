import { useState } from "react";

function App() {
  const [people, setPeople] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {name: newName}
    setPeople(people.concat(newPerson));
  }

  const renderedPeople = people.map((person) => (
    <p key={person.name}>{person.name}</p>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <label htmlFor="nameInput">name:</label>
        <input
          type="text"
          id="nameInput"
          name="nameInput"
          value={newName}
          onChange={handleChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{renderedPeople}</div>
    </div>
  );
}

export default App;

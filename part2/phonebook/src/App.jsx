import { useState } from "react";
import "./app.css";

function App() {
  const [people, setPeople] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFilter = (event) => {
    const { value } = event.target;
    setFilter(value);
    filterContacts(value);
  };

  const filterContacts = (filteredName) => {
    const filteredPeople = [...people].filter((person) =>
      person.name.toLowerCase().includes(filteredName)
    );
    setFilteredPeople(filteredPeople);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const addNewPerson = { ...newPerson, id: people.length + 1 };
    const alreadyExists = people.find((person) => {
      return (
        person.name === addNewPerson.name ||
        person.number === addNewPerson.number
      );
    });

    if (!alreadyExists) {
      setPeople(people.concat(addNewPerson));
    } else {
      alert(`${addNewPerson.name} is already added to phonebook`);
    }
  };

  const renderedList = (peopleList) => {
    return peopleList.map((people) => (
      <p key={people.id}>
        {people.name}: {people.number}
      </p>
    ));
  };

  return (
    <div id="main">
      <div className="form-group">
        <label htmlFor="search">Filter by name:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={filter}
          onChange={handleFilter}
        />
      </div>
      <h2>Add New</h2>
      <form onSubmit={handleAdd}>
        <fieldset>
          <legend>Phonebook</legend>
          <div className="form-group">
            <label htmlFor="name">name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newPerson.name}
              onChange={handleChange}
            />
            <div className="form-group">
              <label htmlFor="number">number:</label>
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
      <h2>Contacts</h2>
      <div>{!filter ? renderedList(people) : renderedList(filteredPeople)}</div>
    </div>
  );
}

export default App;

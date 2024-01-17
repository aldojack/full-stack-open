import { useState } from "react";
import "./app.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Heading from "./components/Heading";

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
    filterContacts(value.toLowerCase());
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
      alert(`This name or number is already added to phonebook`);
    }
  };

  const renderedList = (peopleList) => {
    return peopleList.map((contact) => {
      console.log(contact);
      return <Contact contact={contact} />;
    });
  };

  return (
    <div id="main">
      <Filter 
        filter={filter} 
        onChange={handleFilter} 
      />
      <Heading 
        title="Add New" 
      />
      <Form
        onSubmit={handleAdd}
        onChange={handleChange}
        newPerson={newPerson}
      />
      <Heading 
        title="Contacts"   
      />
      <ContactList
        contactList={
          !filter ? renderedList(people) : renderedList(filteredPeople)
        }
        />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./app.css";
import axios from 'axios'
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Heading from "./components/Heading";

function App() {
  const [people, setPeople] = useState([])
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        setPeople(response.data)
    })
  },[])

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
      return <Contact key={contact.id} contact={contact} />;
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

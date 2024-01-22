import { useEffect, useState } from "react";
import "./app.css";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Heading from "./components/Heading";
import contactService from './services/contacts';

function App() {
  const [people, setPeople] = useState([])
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {

    contactService.getAll()
      .then(allContacts => setPeople(allContacts));
  },[])

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
    if (filteredName === "") {
      contactService.getAll()
        .then(allContacts => {
          setPeople(allContacts)
          setFilteredPeople([]);
      })
    }
    const regex = new RegExp( filteredName, 'i' );
    const filteredPeople = people.filter((person) =>
      person.name.match(regex)
    );
    console.log(`searching ${filteredName}`)
    console.log('returning', filteredPeople);
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
      //If does not exist then add new person
      setPeople(people.concat(addNewPerson));
    } else {
      alert(`This name or number is already added to phonebook`);
    }
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
        contactList={filter ? filteredPeople : people}
        />
    </div>
  );
}

export default App;

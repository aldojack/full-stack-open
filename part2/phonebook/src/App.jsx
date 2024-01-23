import { useEffect, useState } from "react";
import "./app.css";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Heading from "./components/Heading";
import contactService from "./services/contacts";

function App() {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    contactService.getAll().then((allContacts) => setPeople(allContacts));
  }, []);

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
      contactService.getAll().then((allContacts) => {
        setPeople(allContacts);
        setFilteredPeople([]);
      });
    }
    const regex = new RegExp(filteredName, "i");
    const filteredPeople = people.filter((person) => person.name.match(regex));
    setFilteredPeople(filteredPeople);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const addNewPerson = { ...newPerson };
    const alreadyExists = people.find((person) => {
      return (
        person.name === addNewPerson.name ||
        person.number === addNewPerson.number
      );
    });

    if (!alreadyExists) {
      // If does not exist then add new person
      contactService
        .create(addNewPerson)
        .then((createdContact) => setPeople(people.concat(createdContact)))
        .catch((error) =>
          console.log("catch error found in handle add: ", error)
        );
    } else {
      // If the contact already exists, prompt for update
      let updateMessage = "This contact already exists. Do you want to update it?";

      if (alreadyExists.name === addNewPerson.name) {
        updateMessage = `${alreadyExists.name} already has a phone number of ${alreadyExists.number}. Do you want to update it to ${addNewPerson.number}?`;
      } else if (alreadyExists.number === addNewPerson.number) {
        updateMessage = `${alreadyExists.name} has this number. Do you want to update the name to ${addNewPerson.name}?`;
      }

      const updateConfirmed = window.confirm(updateMessage);

      if (updateConfirmed) {
       
        contactService
          .update(alreadyExists.id, addNewPerson)
          .then((updatedContact) => {
            setPeople(
              people.map((person) =>
                person.id === alreadyExists.id ? updatedContact : person
              )
            );
          })
          .catch((error) =>
            console.log("catch error found in handle update: ", error)
          );
      }
    }
  };

  const handleDelete = (id) => {
    const personToDelete = people.find((person) => person.id === id);
    if (window.confirm(`Do you wish to delete ${personToDelete.name}`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          window.alert(`${personToDelete.name} deleted successfully`);
          setPeople(
            [...people].filter((deleteContact) => deleteContact.id !== id)
          );
        })
        .catch((error) =>
          window.alert(`Error found in handle delete: `, error)
        );
    }
  };

  // const handleEdit = (id) => {};

  return (
    <div id="main">
      <Filter filter={filter} onChange={handleFilter} />
      <Heading title="Add New" />
      <Form
        onSubmit={handleAdd}
        onChange={handleChange}
        newPerson={newPerson}
      />
      <Heading title="Contacts" />
      <ContactList
        contactList={filter ? filteredPeople : people}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

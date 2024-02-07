import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Heading from "./components/Heading";
import contactService from "./services/contacts";

function App() {
  const [people, setPeople] = useState(null);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    contactService
      .getAll()
      .then((allContacts) => setTimeout(() => setPeople(allContacts), 1500));
  }, []);

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    const person = { ...newPerson, [name]: value };
    setNewPerson(person);
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
    setError('');
    const addNewPerson = { ...newPerson };
    if(validatePerson(addNewPerson))
    {
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
          .then((createdContact) => {
            setPeople(people.concat(createdContact));
            setNewPerson({ name: "", number: "" });
            notify(`new contact ${createdContact.name} added`);
          })
          .catch((error) => {
            handleError(
              error,
              `Unable to add ${addNewPerson.name}, please refresh and try again`
            );
          });
      } else {
        // If the contact already exists, prompt for update
        let updateMessage =
          "This contact already exists. Do you want to update it?";
  
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
              setNewPerson({ name: "", number: "" });
              notify(`${updatedContact.name} updated`);
            })
            .catch((error) => {
              handleError(
                error,
                `Unable to update contact, please refresh and try again`
              );
            });
        }
      }
    };

    }

  const validatePerson = (person) => {

    if(person.name.length < 3) {
      setError('Name must be longer than 3 characters long')
      return false;
    }
    if(!person.number) {
      setError('Please enter number')
      return false
    }
    if(person.number.length < 8) {
      setError('Phone number must be more than 8 characters')
      return false;
    }
    return true;
  }

  const handleDelete = (id) => {
    const personToDelete = people.find((person) => person.id === id);
    if (window.confirm(`Do you wish to delete ${personToDelete.name}`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setPeople(
            [...people].filter((deleteContact) => deleteContact.id !== id)
          );
          notify(`${personToDelete.name} deleted successfully`);
        })
        .catch((error) => {
          handleError(
            error,
            `Unable to delete ${personToDelete.name}, please refresh and try again`
          );
        });
    }
  };

  const handleError = (error, message) => {
    const errorDisplay = error.response.data.error;

    setError(errorDisplay)
    notify(message)
  };



  const notify = (message) => toast(message);

  return (
    <div id="main">
      <Filter filter={filter} onChange={handleFilter} />
      <Heading title="Add New" />
      <Form
        onSubmit={handleAdd}
        onChange={handleChange}
        newPerson={newPerson}
      />
      {error && <p>{error}</p>}
      <ToastContainer pauseOnHover />
      <Heading title="Contacts" />
      {!people ? (
        <p>Loading...</p>
      ) : (
        <ContactList
          contactList={filter ? filteredPeople : people}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;

import React from "react";
import FormComponent from "./FormComponent";

function Form({ onSubmit, onChange, newPerson }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Phonebook</legend>
        <FormComponent name="name" value={newPerson.name} onChange={onChange} />
        <FormComponent
          name="number"
          value={newPerson.number}
          onChange={onChange}
        />
        <button type="submit">add</button>
      </fieldset>
    </form>
  );
}

export default Form;

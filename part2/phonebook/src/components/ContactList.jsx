import React from "react";
import Contact from "./Contact";

function ContactList({ contactList, onDelete, onEdit }) {
  const renderedList = contactList.map((contact) => {
    return (
      <Contact
        key={contact.id}
        contact={contact}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    );
  });
  return <div className="contact-container">{renderedList}</div>;
}

export default ContactList;

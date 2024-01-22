import React from 'react'
import Contact from './Contact';

function ContactList({ contactList }) {
  
  const renderedList = contactList.map((contact) => {
      return <Contact key={contact.id} contact={contact} />;
    });
  return (
    <div>{renderedList}</div>
  )
}

export default ContactList
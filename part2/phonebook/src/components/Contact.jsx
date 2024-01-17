import React from "react";

function Contact({ contact }) {
  return (
    <p>
      {contact.name}: {contact.number}
    </p>
  );
}

export default Contact;

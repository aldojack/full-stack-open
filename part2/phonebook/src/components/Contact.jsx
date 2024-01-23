import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import React from "react";

function Contact({ contact, onDelete, onEdit }) {
  return (
    <div className="contact">
      <p>
        {contact.name}: {contact.number}
      </p>
      <div className="crudContainer">
        {/* <Chip
          variant="soft"
          className="contact-editBtn"
          color="primary"
          endDecorator={<EditIcon onEdit={() => onEdit(contact.id)} />}
        >
          Edit
        </Chip> */}
        <Chip
          variant="soft"
          className="contact-deleteBtn"
          color="danger"
          endDecorator={<ChipDelete onDelete={() => onDelete(contact.id)} />}
        >
          Delete
        </Chip>
      </div>
    </div>
  );
}

export default Contact;

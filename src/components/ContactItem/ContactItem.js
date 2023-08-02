import React from 'react';
import './ContactItem.css';

const ContactItem = ({ contact, onDelete, onEdit }) => {
  const onItemDelete = () => {
    onDelete(contact.id);
  };

  const onContactEdit = () => {
    onEdit(contact);
  };

  return (
    <div className='contact-item'>
      <p className='content' onDoubleClick={onContactEdit}>
        {contact.firstName} {contact.lastName}
      </p>
      <span className='delete-btn' onClick={onItemDelete}>
        X
      </span>
    </div>
  );
};

export default ContactItem;

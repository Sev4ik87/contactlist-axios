import React from 'react';
import './ContactItem.css';
import api from '../../contact-service'; 

const ContactItem = ({ contact, onDelete, onEdit }) => {
  const onItemDelete = () => {
    api.delete(`/${contact.id}`)
      .then(() => {
        onDelete(contact.id);
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
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

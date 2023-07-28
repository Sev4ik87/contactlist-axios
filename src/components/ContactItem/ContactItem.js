import React, { useCallback } from 'react';
import './ContactItem.css';

const ContactItem = ({ contact, onDelete, onEdit }) => {
  const onItemDelete = useCallback(() => {
    onDelete(contact.id);
  }, [contact.id, onDelete]);

  const onContactEdit = useCallback(() => {
    onEdit(contact);
  }, [contact, onEdit]);

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

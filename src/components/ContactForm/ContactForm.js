import React, { useState, useEffect, useCallback } from 'react';
import './ContactForm.css';
import api from '../../contact-service';

const ContactForm = ({ contactForEdit, onSubmit, onDelete }) => {
  const [contact, setContact] = useState({ ...contactForEdit });

  useEffect(() => {
    setContact({ ...contactForEdit });
  }, [contactForEdit]);

  const createEmptyContact = () => {
    return {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const onClearField = (fieldName) => {
    setContact((prevContact) => ({
      ...prevContact,
      [fieldName]: '',
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!contact.id) {
      api.post('/', contact)
        .then(({ data }) => {
          contact.id = data.id;
          onSubmit({ ...contact });
        })
        .catch((error) => {
          console.error('Error creating contact:', error);
        });
    } else {
      api.put(`/${contact.id}`, contact)
        .then(() => { 
          onSubmit({ ...contact });
        })
        .catch((error) => {
          console.error('Error updating contact:', error);
        });
    }
  };

  const onContactDelete = useCallback(() => {
    api.delete(`/${contact.id}`)
      .then(() => {
        onDelete(contact.id);
        setContact(createEmptyContact());
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  }, [contact.id, onDelete]);

  return (
    <form id='contact-form' onSubmit={onFormSubmit}>
      <div className='form-container'>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='First name'
            required
            name='firstName'
            value={contact.firstName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('firstName')}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Last name'
            required
            name='lastName'
            value={contact.lastName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('lastName')}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='email'
            className='text-field'
            placeholder='Email'
            required
            name='email'
            value={contact.email}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('email')}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Phone'
            required
            name='phone'
            value={contact.phone}
            onChange={onInputChange}
          />
          <span className='clear' onClick={() => onClearField('phone')}>
            X
          </span>
        </div>
      </div>

      <div className='btns'>
        <button id='save' type='submit'>
          Save
        </button>
        {contact.id ? (
          <button id='delete' type='button' onClick={onContactDelete}>
            Delete
          </button>
        ) : (
          ''
        )}
      </div>
    </form>
  );
};

export default ContactForm;

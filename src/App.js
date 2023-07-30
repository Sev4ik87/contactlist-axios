import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import api from './contact-service';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact() {
    return {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  }

  useEffect(() => {
    api.get('/').then(({ data }) => {
      data ? setContacts(data) : setContacts([]);
    });
  }, []);

  const deleteContact = (id) => {
    api.delete(`/${id}`)
      .then(() => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  const addNewContact = () => {
    setContactForEdit(createEmptyContact());
  };

  const selectContact = (contact) => {
    setContactForEdit(contact);
  };

  const createContact = (contact) => {
    api.post('/', contact)
      .then(({ data }) => {
        contact.id = data.id;
        setContacts((prevContacts) => [...prevContacts, contact]);
        setContactForEdit(createEmptyContact());
      })
      .catch((error) => {
        console.error('Error creating contact:', error);
      });
  };

  const updateContact = (contact) => {
    api.put(`/${contact.id}`, contact)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.map((item) => (item.id === contact.id ? contact : item))
        );
        setContactForEdit(contact);
      })
      .catch((error) => {
        console.error('Error updating contact:', error);
      });
  };

  const saveContact = (contact) => {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  };

  return (
    <div className='container'>
      <h1 className='header'>Contact List</h1>
      <div className='main'>
        <ContactList
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onEditContact={selectContact}
        />
        <ContactForm
          key={contactForEdit.id}
          contactForEdit={contactForEdit}
          onSubmit={saveContact}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;

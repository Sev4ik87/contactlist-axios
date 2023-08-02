import api from './contact-service';
import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  }

  const saveState = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  
  useEffect(() => {
		api.get('/').then(({ data }) => {
			data ? setContacts(data) : setContacts([]);
		});
	}, []);
  const deleteContact = (id) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter((contact) => contact.id !== id);
      saveState(updatedContacts);
      return updatedContacts;
    });
  
    api.delete(`/${id}`)
      .then(response => {
      })
      .catch(error => {
      });
  };
  

 

  const addNewContact = () => {
    setContactForEdit(createEmptyContact());
  };

  const selectContact = (contact) => {
    setContactForEdit(contact);
  };

  
    

  const createContact = (contact) => {
    const newContact = { ...contact, id: Date.now() }; // Создаем новый объект контакта с добавленным полем id
  
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setContactForEdit(createEmptyContact());
  
    api.post('/', newContact)
      .then(response => {
      })
      .catch(error => {
      });
  };
  

  

  const updateContact = (contact) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.map((item) => (item.id === contact.id ? contact : item));
      saveState(updatedContacts);
      return updatedContacts;
    });
  
    api.put(`/${contact.id}`, contact)
      .then(response => {
      })
      .catch(error => {
      });
  
    setContactForEdit(contact);
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

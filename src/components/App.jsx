import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import initialContacts from './contacts.json';
import { Filter } from "./ContactFilter/ContactFilter";

export const App = () => {
  const CONTACTS = 'contacts';
  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]); 

  const changeInput = e => {
    setFilter(e.currentTarget.value)
  };

  const addContact = ({ name, number }) => {
    if (contacts.some(value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    ) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(oldState => {
        const list = [...oldState]; 
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return list;
      });
    }
  };

  const deleteContact = id => {
    const filtred = contacts.filter(item => item.id !== id);
    setContacts(filtred);
  }

  const filterFu = () => {
    const filteredContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

    return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101'
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact}/>
      <h2>Contacts</h2>
      <Filter 
        value={filter} 
        onChange={changeInput} />
      <ContactList 
        contacts={filterFu()} 
        onDelete={deleteContact}/>
    </div>
  );
};
  
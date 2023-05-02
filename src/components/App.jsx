import { nanoid } from "nanoid";
import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import initialContacts from './contacts.json';
import { Filter } from "./ContactFilter/ContactFilter";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts')
    if(savedContacts !== null) {
      const parsedContacts =JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    };
    this.setState({ contacts: initialContacts });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts  !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };



  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(oldState => {
        const list = [...oldState.contacts]; 
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });

        return { contacts: list };
      });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

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
      <ContactForm onAddContact={this.addContact}/>
      <h2>Contacts</h2>
      <Filter 
        value={filter} 
        onChange={this.changeFilter} />
      <ContactList 
        contacts={visibleContacts} 
        onDelete={this.deleteContact}/>
    </div>
  );
  }
  
};

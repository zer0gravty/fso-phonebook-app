import React, { useState, useEffect } from 'react';
import FilterForm from './components/Filter';
import People from './components/People';
import AddPersonForm from './components/AddPerson';
import Banner from './components/Banner';
import './components/Banner.css';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  useEffect( () => {
    phonebookService
      .getAll()
      .then(currentPhonebook => setPersons(currentPhonebook))
      .catch(error => {
        console.log(`Error fetching data from database:\n\t${error}`);
      })
  }, [statusCode])

  const displayBanner = (code, duration) => {
    setStatusCode(code);
    setTimeout(() => {
      setStatusCode(null);
    }, duration);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    const foundPerson = persons.find( person => person.name === newName);
    if (foundPerson) {
      if (window.confirm(`${personObj.name} is already added to the phonebook; replace the old number with a new one?`)) {
        phonebookService
          .update(foundPerson.id, {...foundPerson, number: newNumber})
          .then( updatedPerson => {
            displayBanner(200, 5000);
          })
          .catch(error => {
            console.log(`Error updating person's number:\n\t${error}`);
            displayBanner(error.response.status, 3000);
          });
      }
    } else {
      phonebookService
        .create(personObj)
        .then( newPerson => {
          displayBanner(201, 5000);
        })
        .catch(error => {
          console.log(`There was an error in adding the person:\n\t${error}`);
          displayBanner(error.response.status, 3000);
        });
    }

    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (id) => {
    const person = persons.find( person => person.id === id);
    const confirmed = window.confirm(`Are you sure you want to delete ${person.name}?`);
    if(confirmed) {
      phonebookService
        .remove(person.id)
        .then(() => {
          setStatusCode(204);
        })
        .catch(error => {
          console.log(`Error deleting person with id ${id}:\n\t${error}`);
          displayBanner(error.response.status, 5000);
        });
    }
  }

  const filterPhonebook = (event) => {
    setFilterBy(event.target.value);
  }

  const filteredBook = filterBy
    ? persons.filter( ({name}) => name.toLowerCase().startsWith(filterBy.toLowerCase()) )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {statusCode && <Banner statusCode={statusCode} />}
      <FilterForm filterBy={filterBy} action={filterPhonebook} />
      <AddPersonForm submit={addPerson} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber} />
      <People phonebook={filteredBook} deletePerson={deletePerson} />
    </div>
  )
}

export default App;

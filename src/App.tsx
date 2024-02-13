import { useEffect, useState } from 'react';
import { NewPerson, Person } from './types/person';
import personService from './services/persons';
import AddPersonForm from './components/AddPersonForm/AddPersonForm';
import IndividualPerson from './components/IndividualPerson/IndividualPerson';
import Notification from './components/Notification/Notification';

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res.data));
  }, []);

  const personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter))
    : persons;

  
  /**
   * Helper function to set up notification
   * 
   * @param message The notification message
   * @param isItError Boolean to indicates whether the notification is an error
   */
  const notificationHelper = (message: string, isItError : boolean)  => {
    setIsError(isItError)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage('')
    }, 6000);
  }

  const addPerson = async (newPerson: NewPerson) => {
    const matchPerson = persons.find((person) => person.name === newPerson.name);
    // If the name is already used
    if (matchPerson) {
      // If user confirms wants to replace number
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook. Replace old number with a new one?`
        )
      ) {
        const res = await personService.update(matchPerson.id, newPerson)
        setPersons(
          persons.map(p => p.id === matchPerson.id ? res.data : p)
        )
        setIsError(false)
        setNotificationMessage(`Modified ${newPerson.name}'s number`)
        setTimeout(() => {
          setNotificationMessage('')
        }, 6000);
        return true // to indicates that data is submitted, so reset the add new name and number field
      } else {
        return false
      }
    } else {
      const res = await personService.create(newPerson)
      setPersons(persons.concat(res.data))
      setIsError(false)
      setNotificationMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setNotificationMessage('')
      }, 6000);
      return true
    }
  };

  const deletePerson = (id: string) => {
    personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)))
      .catch((error: unknown) => {
        let errorMessage = 'Something went wrong!';
        if (error instanceof Error) {
          errorMessage += ` ${error.message}`;
        }
        throw new Error(errorMessage);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification isError={isError} message={notificationMessage} />
      filter shown with{' '}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <h2>Add New Person</h2>
      <AddPersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <IndividualPerson
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </div>
  );
};
export default App;

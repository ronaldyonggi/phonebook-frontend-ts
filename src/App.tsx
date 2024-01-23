import { useEffect, useState } from "react"
import AddPersonForm from "./components/AddPersonForm"
import IndividualPerson from "./components/IndividualPerson"
import { Person } from "./types/Person"
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(res => setPersons(res.data))
  }, [])

  const personsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter) )
  : persons

  const handleDelete = (id: string) => {
    personService
    .deletePerson(id)
    .then(() => setPersons(persons.filter(person => person.id !== id))) 
    .catch((error: unknown) => {
      let errorMessage = 'Something went wrong!'
      if (error instanceof Error) {
        errorMessage += error.message
      }
      throw new Error(errorMessage)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown as <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
      <h2>Add New Person</h2>
      <AddPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <IndividualPerson key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />
      ))}
    </div>
  )
}
export default App
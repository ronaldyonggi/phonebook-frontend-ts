import { useState } from "react"
import AddPersonForm from "./components/AddPersonForm"
import IndividualPerson from "./components/IndividualPerson"
import { Person } from "./types/Person"

const App = () => {
  const initialPersons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [persons, setPersons] = useState<Person[]>(initialPersons)
  const [filter, setFilter] = useState('');

  const personsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter) )
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown as <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
      <h2>Add New Person</h2>
      <AddPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <IndividualPerson key={person.id} person={person} />
      ))}
    </div>
  )
}
export default App
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
  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {persons.map(person => (
        <IndividualPerson key={person.id} person={person} />
      ))}
    </div>
  )
}
export default App
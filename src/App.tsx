import { useState } from "react"
import AddPersonForm from "./components/AddPersonForm"
import IndividualPerson from "./components/IndividualPerson"
import { Person } from "./types/Person"

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '123-4567'
    }
  ])
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
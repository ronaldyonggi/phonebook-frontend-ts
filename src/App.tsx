import { useEffect, useState } from "react"
import AddPersonForm from "./components/AddPersonForm"
import IndividualPerson from "./components/IndividualPerson"
import { Person } from "./types/Person"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

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
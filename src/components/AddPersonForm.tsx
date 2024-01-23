import { SyntheticEvent, useState } from "react"
import { Person } from "../types/Person"

interface AddPersonFormProps {
    persons: Person[];
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
}

const AddPersonForm = ({ persons, setPersons }: AddPersonFormProps) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event: SyntheticEvent) => {
    event.preventDefault();

    const matchPerson = persons.find(person => person.name === newName)
    // If the name is already used
    if (matchPerson) {
      // If user confirms wants to replace number
      if (window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
        const newPerson = {
          name: newName,
          number: newNumber
        }

        personService
        .update(matchPerson.id, newPerson)
        .then(res => {
          setPersons(persons.map(person => person.id === matchPerson.id ? res.data : person))
        } )

        setNewName('')
        setNewNumber('')
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(newPerson));
      setNewName('')
      setNewNumber('')
    }

  }

  return (
    <form onSubmit={addPerson}>
      Name: <input type="text" 
      value={newName} 
      onChange={e => setNewName(e.target.value)} />
      Number: <input type="text" 
      value={newNumber} 
      onChange={e => setNewNumber(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}
export default AddPersonForm
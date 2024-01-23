import { Person } from "../types/Person"

interface IndividualPersonProps {
  person: Person;
  handleDelete: () => void;
}

const IndividualPerson = ({ person, handleDelete }: IndividualPersonProps) => {

  const handleDeleteButton = (): void => {
    if (window.confirm(`Delete ${person.name}?`)) {
      handleDelete()
    }
  }


  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDeleteButton}>delete</button>
    </div>
  )
}

export default IndividualPerson
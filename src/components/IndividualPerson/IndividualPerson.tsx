import { Person } from "../../types/person";

interface IndividualPersonProps {
  person: Person;
  deletePerson: (id: string) => void
}

const IndividualPerson = ({ person, deletePerson }: IndividualPersonProps) => {
  const handleDeleteClick = (): void => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id);
    }
  };

  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDeleteClick}>delete</button>
    </div>
  );
};

export default IndividualPerson;

import { Person } from '../types/person';

interface IndividualPersonProps {
  person: Person;
  handleDelete: (id: string) => void
}

const IndividualPerson = ({ person, handleDelete }: IndividualPersonProps) => {
  const handleDeleteClick = (): void => {
    if (window.confirm(`Delete ${person.name}?`)) {
      handleDelete(person.id);
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

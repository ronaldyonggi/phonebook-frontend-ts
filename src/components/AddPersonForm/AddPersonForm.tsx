import { SyntheticEvent, useState } from 'react';
import { NewPerson } from '../../types/person';

interface AddPersonFormProps {
  addPerson: (newPerson: NewPerson) => Promise<boolean>;
}

const AddPersonForm = ({ addPerson }: AddPersonFormProps) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleAdd = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newPerson : NewPerson = {
      name: newName,
      number: newNumber
    }

    const submitted = await addPerson(newPerson)
    if (submitted) {
      setNewName('')
      setNewNumber('')
    }

  };

  return (
    <form onSubmit={handleAdd}>
      Name:{' '}
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <br />
      Number:{' '}
      <input
        type="text"
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
export default AddPersonForm;

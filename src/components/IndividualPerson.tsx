import { Person } from "../types/Person"

interface IndividualPersonProps {
  person: Person
}

const IndividualPerson = ({ person }: IndividualPersonProps) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

export default IndividualPerson
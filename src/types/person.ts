export interface Person {
  id: string;
  name: string;
  number: string;
}

export type NewPerson = Omit<Person, 'id'>
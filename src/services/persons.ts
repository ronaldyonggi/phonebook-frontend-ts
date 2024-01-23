import axios from "axios"
import { Person } from "../types/Person"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get<Person[]>(baseUrl)
}

const create = (newObject: object) => {
  return axios.post<Person>(baseUrl, newObject)
}

const update = (id: string, newObject: object) => {
  return axios.put<Person>(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id: string) => {
  return axios.delete<Person>(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  deletePerson
}
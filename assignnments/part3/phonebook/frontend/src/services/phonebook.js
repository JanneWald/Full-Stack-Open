import axios from 'axios'
const url = '/api/persons' // No longer need full localhost:3001 url if same host with frontend build

const getAll = async () => {
  console.log('getting request')
  // auto parses the response field
  const response = await axios
    .get(url)
  return response.data
}

const add = async (name, number) => {
  const phonebookObject = { name, number }
  const response = await axios
    .post(url, phonebookObject)
  console.log(response)
  return response.data
}

const remove = async (id) => {
  const nameURL = `${url}/${id}`
  const response = await axios
    .delete(nameURL)
  console.log(response)
  return response.data
}

const update = async (previousEntry, newNumber) => {
  const newEntry = { ...previousEntry, 'number': newNumber }
  const response = await axios
    .put(`${url}/${previousEntry.id}`, newEntry)
  console.log(response)
  return response.data
}

export default { getAll, add, remove, update }
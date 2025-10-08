import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content:content, id:getId(), votes:0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteFor = async (id, currVotes) => {
  console.log('ye we in the service, adding +1 to ', currVotes)
  const response = await axios.patch(`${baseUrl}/${id}`, { votes: currVotes + 1 })
  return response.data
}

export default {
  getAll,
  createNew,
  voteFor
}
import axios from 'axios'
const baseAddress = 'http://localhost:3001/anecdotes'


export const getAnecdotes = () => axios.get(baseAddress).then(res => res.data)
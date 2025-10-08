import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action){
      const anecdote = asObject(action.payload)
      state.push(anecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    voteAnecdote(state, action){
      const id = action.payload
      return state.map(anecdote => {
        if (anecdote.id === id)
          return {...anecdote, votes: anecdote.votes + 1}
        else
          return anecdote
      })
    }
  }
})

export const { addAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
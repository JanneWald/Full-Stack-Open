import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action){
      state.push(action.payload)
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdoteString) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(anecdoteString)
    dispatch(addAnecdote(anecdote))
  }
}
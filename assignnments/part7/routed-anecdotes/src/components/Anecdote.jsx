const Anecdote = ({anecdote}) => {
  const {content, author, votes, info} = anecdote
  console.log(anecdote)

  return(
    <>
    <h2>{content} by {author}</h2>
    <p>Has {votes} votes</p>
    <p>More info: {info}</p>

    </>
  )
}

export default Anecdote
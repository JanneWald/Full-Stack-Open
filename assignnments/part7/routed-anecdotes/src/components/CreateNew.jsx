import useField from "../hooks/field"

const CreateNew = ({addNew}) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const clearAll = (event) => {
    event.preventDefault()
    const fields = [content, author, info]
    fields.forEach(field => field.clear())
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={clearAll}>clear</button>
      </form>
    </div>
  )
}

export default CreateNew
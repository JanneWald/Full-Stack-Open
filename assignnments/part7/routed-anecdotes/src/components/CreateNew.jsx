import useField from "../hooks/field"

const CreateNew = ({addNew}) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const { clear: clearContent, ...contentProps } = content
  const { clear: clearAuthor, ...authorProps } = author
  const { clear: clearInfo, ...infoProps } = info

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
    const clearFunctions = [clearContent, clearAuthor, clearInfo]
    clearFunctions.forEach(clearFunction => clearFunction())
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button>create</button>
        <button onClick={clearAll}>clear</button>
      </form>
    </div>
  )
}

export default CreateNew
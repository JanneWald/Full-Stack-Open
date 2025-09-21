import { useState } from 'react'

const BlogForm = ({submitBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return(
    <>
        <form onSubmit={(event) => submitBlog(event, {title, author, url})}>
            <div>
                <label>
                Title
                <input
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                </label>
            </div>
            <div>
                <label>
                Author
                <input
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
                </label>
            </div>
            <div>
                <label>
                Url
                <input
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
                </label>
            </div>
            <button type="submit"> Add</button>

        </form>
    </>)
}

export default BlogForm
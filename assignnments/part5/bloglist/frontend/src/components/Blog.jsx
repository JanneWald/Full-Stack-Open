import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, currentUser }) => {
  const [detailedView, setDetailedView] = useState(false)
  const { title, author, url, likes } = blog
  let user = blog.user
  if (!user)
    user = { username: 'unknown' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (detailedView) {
    return (
      <div style={blogStyle} className="blog-details">
        <p><i>{title}</i> <button onClick={() => {setDetailedView(false)}}>Hide Details</button></p>
        <p>By: {author}</p>
        <p>{url}</p>
        <p>Likes: {likes} <button onClick={(event) => likeBlog(event, blog)}> Like</button></p>
        <p>Added by: {user.username}</p>
        {currentUser === user.username && (
          <button onClick={(event) => removeBlog(event, blog)}>Delete</button>
        )}
      </div>
    )
  }
  else{
    return(
      <div style={blogStyle} className="blog-summary">
        <i>{title}</i>, {author} <button onClick={() => {setDetailedView(true)}}>Show Details</button>
      </div>)
  }
}

export default Blog
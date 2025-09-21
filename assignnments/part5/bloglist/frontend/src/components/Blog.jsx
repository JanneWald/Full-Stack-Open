import {useState} from 'react'

const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false)
  const {title, author, url, likes} = blog
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (detailedView) {
    return (
      <div style={blogStyle}>
        <p><i>{title}</i> <button onClick={() => {setDetailedView(false)}}>Hide Details</button></p>
        <p>By: {author}</p>
        <p>{url}</p>
        <p>Likes: {likes} <button>Like</button></p>
      </div>
    )
  }
  else{
    return(  
    <div style={blogStyle}>
      <i>{title}</i>, {author} <button onClick={() => {setDetailedView(true)}}>Show Details</button>
    </div>)
  }
}

export default Blog
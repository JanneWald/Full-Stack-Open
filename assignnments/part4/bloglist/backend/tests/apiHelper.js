const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]

const initialHashedUsers = [
  {
    username: "user1",
    name: "user1",
    passwordHash: "$2b$10$165Mh2zrvTevSKY8FI/oIeblDdfuAnppxitU4wcYlq2PwfAdMUOwi"
  },
  {
    username: "user2",
    name: "user2",
    passwordHash: "$2b$10$165Mh2zrvTevSKY8FI/oIeblDdfuAnppxitU4wcYlq2PwfAdMUOwi"
  },
    {
    username: "user3",
    name: "user3",
    passwordHash: "$2b$10$165Mh2zrvTevSKY8FI/oIeblDdfuAnppxitU4wcYlq2PwfAdMUOwi"
  },
]

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, initialHashedUsers, blogsInDb
}
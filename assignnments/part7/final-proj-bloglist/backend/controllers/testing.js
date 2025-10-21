const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  console.log('Wiping everything!!!!')
  const deletedBlogs = await Blog.deleteMany({})
  const deletedUsers = await User.deleteMany({})
  console.log('Deleted:', deletedBlogs.deletedCount, 'blogs,', deletedUsers.deletedCount, 'users')

  const remaining = await Blog.find({})
  console.log('Remaining after wipe:', remaining.length)

  response.status(204).end()
})

module.exports = router
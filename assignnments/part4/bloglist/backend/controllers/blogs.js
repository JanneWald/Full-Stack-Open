/*
Logic for Express server routing. 

Facilitates REST operations on blog URI's and makes appropriate calls to our MongoDB\

*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require('../utils/middleware')

// Returns all blogs, should not need a token
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})    
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const user = request.user

  const {title, author, url, likes} = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if(user._id.toString() != blog.user.toString()){
    return response.status(403).json({error: 'not owner of this blog'})
  }

  await blog.deleteOne()
  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
  await user.save()

  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response, next) => {
  const { author, title, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) 
    return response.status(404).end()

  blog.author = author
  blog.title = title
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
  
})

module.exports = blogsRouter

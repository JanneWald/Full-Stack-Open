const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./apiHelper')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('api tests', () => {
    test('notes are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, 2)
    })

    test('blogs have an id not _id field', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]

        assert.strictEqual(blog._id, undefined)
        assert.ok(blog.id)
    })

    test('Adding a blog', async () => {
        const newBlog = {
            title:"A new blog",
            author:"Fad author whos gonne be irrelevant",
            url:"www.dontcare.com",
            likes:0
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const notesAtEnd = await helper.blogsInDb()
        assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('Adding a blog w/o like count', async () => {
        const newBlog = {
            title:"An improper blog",
            author:"John author",
            url:"www.johnauthor.com",
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const savedBlog = await Blog.findById(response.body.id)
        assert.strictEqual(savedBlog.likes, 0)
    })
})


after(async () => {
    await mongoose.connection.close()
})


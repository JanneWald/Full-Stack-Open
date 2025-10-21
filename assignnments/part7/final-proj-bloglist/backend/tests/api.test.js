const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./apiHelper')
const api = supertest(app)

const loginAndGetToken = async () => {
  const response = await api
    .post('/api/login')
    .send({username:"root", password:"123456"})
    .expect(200)

  return response.body.token
}


beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialHashedUsers)
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('blog api tests', () => {
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

        const token = await loginAndGetToken()

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)

        const notesAtEnd = await helper.blogsInDb()
        assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('Adding a blog w/o like count', async () => {
        const newBlog = {
            title:"An improper blog",
            author:"John author",
            url:"www.johnauthor.com",
        }

        const token = await loginAndGetToken()

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const savedBlog = await Blog.findById(response.body.id)
        assert.strictEqual(savedBlog.likes, 0)
    })

    test('Cant add a blog w/o an title', async () => {
        const newBlog = {
            author:"Johnauthor",
            url:"www.johnauthor.com",
        }

        const token = await loginAndGetToken()

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('Cant add a blog w/o an url', async () => {
        const newBlog = {
            author:"Johnauthor",
            title:"Johns super cool blog",
        }

        const token = await loginAndGetToken()

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

  test('Removing a blog', async () => {
        const newBlog = {
            title:"A new blog with lots of aspiration",
            author:"Fad author whos gonne be DELETED",
            url:"www.getdeleted.com",
            likes:0
        }

        const token = await loginAndGetToken()

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
        
        await api
            .delete(`/api/blogs/${response.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const notesAtEnd = await helper.blogsInDb()
        assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length)
    })

    test('Updating a blog\'s resource with likes', async () => {
        const newBlog = {
            title:"A new blog with lots of aspiration",
            author:"Good author whos gonne get more likes",
            url:"www.getliked.com",
            likes:0
        }

        const moreLikedBlog = {
            title:"A new blog with lots of aspiration",
            author:"Good author whos gonne get more likes",
            url:"www.getliked.com",
            likes:12
        }
        
        const token = await loginAndGetToken()

        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
        
        const putResponse = await api
            .put(`/api/blogs/${postResponse.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(moreLikedBlog)
            .expect(200)

        const notesAtEnd = await helper.blogsInDb()
        const newLikes = putResponse.body.likes
        assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
        assert.strictEqual(newLikes, 12)
    })

    test('Adding anything w/o autherization', async () => {
        const newBlog = {
            title:"A very normal new blog",
            author:"Sneaky devil without creds on the site",
            url:"www.number1blogplease.com",
            likes:0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('user api tests', () => {
    test('Adding a user without a username', async () =>{
        await api
            .post('/api/users')
            .send({name:"nousernamedude", password:"123"})
            .expect(400)
    })

    test('Adding a too short username', async () =>{
        await api
            .post('/api/users')
            .send({username:"ab", name:"shortusernamedude", password:"123"})
            .expect(400)
    })

    test('Adding a user without a password', async () =>{
        const respone = await api
            .post('/api/users')
            .send({username:"user1", name:"nopassdude"})
            .expect(400)


        const {error} = respone.body
        assert.strictEqual(error, 'Password has to be at least 3 characters')
    })

    test('Adding a user with a short password', async () =>{
        const respone = await api
            .post('/api/users')
            .send({username:"user1", name:"shortpassdude", password:"ab"})
            .expect(400)

        const {error} = respone.body
        assert.strictEqual(error, 'Password has to be at least 3 characters')
    })
})

after(async () => {
    await mongoose.connection.close()
})


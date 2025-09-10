const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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
})


after(async () => {
    await mongoose.connection.close()
})


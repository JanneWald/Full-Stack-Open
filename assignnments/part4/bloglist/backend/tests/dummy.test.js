/*
Test cases for node --test
*/
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { setUncaughtExceptionCaptureCallback } = require('node:process')

// Testing data
// Note: only making json objects with likes since is the only thing relevant to our exercises
const oneBlog = [{"likes":12}]
const manyBlogs = []
for(let i = 0; i < 25; i++){
  manyBlogs.push({"likes":1})
}
const subtractingBlogs = [{"likes":1}, {"likes":-4}]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('of one blog', () => {
      total = listHelper.totalLikes(oneBlog)
      assert.strictEqual(total, 12)
  })

  test('of many blogs', () => {
      total = listHelper.totalLikes(manyBlogs)
      assert.strictEqual(total, 25)
  })

    test('of subtracting blogs', () => {
      total = listHelper.totalLikes(subtractingBlogs)
      assert.strictEqual(total, -3)
  })
})
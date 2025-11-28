const assert = require('node:assert') // for adding the test database using the mongo.js program 
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {  
    title: 'testing first blog',
    author: 'author1',
    url: 'aaa',
    likes: 5,
  },
  {
    title: 'testing second blog',
    author: 'author2',
    url: 'bbb',
    likes: 10,
  }
]

beforeEach(async () => {
  console.log('cleared database')
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test.only('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  // - testing only first blog id:
  // const blog = response.body[0]
  // assert.notStrictEqual(blog.id, undefined)
  // assert.strictEqual(blog._id, undefined)

  // - testing all blog id:
    response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })

})

after(async () => {
  await mongoose.connection.close()
})
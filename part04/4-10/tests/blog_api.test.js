const assert = require('node:assert') // for adding the test database using the mongo.js program 
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

// const initialBlogs = [
//   {  
//     title: 'testing first blog',
//     author: 'author1',
//     url: 'aaa',
//     likes: 5,
//   },
//   {
//     title: 'testing second blog',
//     author: 'author2',
//     url: 'bbb',
//     likes: 10,
//   }
// ]

beforeEach(async () => {
  console.log('cleared database')
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })

})

test.only('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'testing adding a blog',
    author: 'author3',
    url: 'ccc',
    likes: 33,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201) // returned status code expected from POST
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  assert(contents.includes('testing adding a blog'))
})

after(async () => {
  await mongoose.connection.close()
})
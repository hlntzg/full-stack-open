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
    url: 'xxx',
    likes: 5,
  },
  {
    title: 'testing second blog',
    author: 'author2',
    url: 'xxx',
    likes: 10,
  }
]

beforeEach(async () => {
  console.log('cleared database')
  await Blog.deleteMany({})

  // let blogObject = new Blog(initialBlogs[0])
  // await blogObject.save()
  // blogObject = new Blog(initialBlogs[1])
  // await blogObject.save()
  await Blog.insertMany(initialBlogs)
})

test.only('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
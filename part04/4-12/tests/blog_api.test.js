const assert = require('node:assert') // for adding the test database using the mongo.js program 
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

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

test('a valid blog can be added ', async () => {
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

test('if the likes property is missing, it defaults to 0', async () => {
  const newBlogNoLikes = {
    title: 'testing a blog without likes',
    author: 'author4',
    url: 'ddd',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test.only('if the title properties are missing, status code 400 Bad Request', async () => {
  const newBlogNoTitle = {
    // title is missing
    author: 'author5',
    url: 'eee',
    likes: 55,
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test.only('if the url properties are missing, status code 400 Bad Request', async () => {
  const newBlogNoUrl = {
    title: 'tetsing a blog without url',
    author: 'author6',
    // url is missing
    likes: 66,
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})


after(async () => {
  await mongoose.connection.close()
})
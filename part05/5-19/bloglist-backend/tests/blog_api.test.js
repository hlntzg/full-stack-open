// npm test -- tests/blog_api.test.js

const { test, describe, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token
let userId

// Setup user + token
before(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password123', 10)
  const user = new User({ username: 'tester', passwordHash })
  const savedUser = await user.save()
  userId = savedUser.id

  const loginResult = await api
    .post('/api/login')
    .send({ username: 'tester', password: 'password123' })

  token = loginResult.body.token
})

// Reset blogs before each test
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsWithUser = helper.initialBlogs.map(b => ({ ...b, user: userId }))
  await Blog.insertMany(blogsWithUser)
})

// Tests
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)

  response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testing adding a blog',
    author: 'author3',
    url: 'ccc',
    likes: 33,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('testing adding a blog'))
})

test('likes default to 0 when missing', async () => {
  const newBlog = {
    title: 'testing a blog without likes',
    author: 'author4',
    url: 'ddd',
  }

  const result = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  assert.strictEqual(result.body.likes, 0)
})

test('missing title returns 400', async () => {
  const newBlog = {
    author: 'author5',
    url: 'eee',
    likes: 55
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('missing url returns 400', async () => {
  const newBlog = {
    title: 'tetsing a blog without url',
    author: 'author6',
    likes: 66,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('deletion succeeds with code 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert(!blogsAtEnd.map(b => b.title).includes(blogToDelete.title))
})

test('updating likes succeeds', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updated = { likes: blogToUpdate.likes + 1 }

  const result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(updated)
    .expect(200)

  assert.strictEqual(result.body.likes, updated.likes)
})

// User creation tests
describe('user creation tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Lily',
      name: 'Lily Smith',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('creation fails if username already exists', async () => {
    const newUser = {
      username: 'root',
      name: 'Same Name',
      password: '12345'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(result.body.error.includes('expected `username` to be unique'))
  })
})

after(async () => {
  await mongoose.connection.close()
})

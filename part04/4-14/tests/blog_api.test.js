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
    // likes missing
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('if the title properties are missing, status code 400 Bad Request', async () => {
  const newBlogNoTitle = {
    // title is missing
    author: 'author5',
    url: 'eee',
    likes: 55,
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('if the url properties are missing, status code 400 Bad Request', async () => {
  const newBlogNoUrl = {
    title: 'tetsing a blog without url',
    author: 'author6',
    // url is missing
    likes: 66,
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

// test for deleting a blog
test('deletion of a blog, succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(n => n.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

// test for updating likes value of a blog
test('updating likes succeeds', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedInfo = { likes: blogToUpdate.likes + 1 }

  const result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedInfo)
    .expect(200)

  assert.strictEqual(result.body.likes, updatedInfo.likes)
})


after(async () => {
  await mongoose.connection.close()
})
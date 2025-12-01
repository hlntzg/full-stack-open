const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {

  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response, next) => {    
  const body = request.body

  // VALIDATION
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  // BEFORE:
  // blog
  //   .save()
  //   .then(savedBlog => {
  //     response.json(savedBlog) // <-- returns 200
  //   })
  //   .catch(error => next(error))
  // WHY CHANGED? The HTTP specification states:
  // 200 OK → request succeeded, but resource not necessarily created
  // 201 Created → resource was created, and now exists in the server
  
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter

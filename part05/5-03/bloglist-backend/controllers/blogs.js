const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {    
  try {
    const body = request.body
    
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid' })
    // }
    // const user = await User.findById(decodedToken.id)
    const user = request.user
    
    // if (!user) {
    //   return response.status(400).json({ error: 'userId missing or not valid' })
    // }

    // VALIDATION
    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async(request, response, next) => {
  try {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid' })
    // }
    // const user = await User.findById(decodedToken.id)
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    // delete if the blog was created by the logged-in user
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete the blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  try {
    const body = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes: body.likes },
      { new: true, runValidators: true }
    )

    if (!updatedBlog) {
      return response.status(404).end()
    }

    response.json(updatedBlog)

  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter

const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
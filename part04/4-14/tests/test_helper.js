const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}
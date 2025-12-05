import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {

  // console.log(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const addLike = () => {
    console.log('clicked')
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title}
          <button onClick={() => setDetailsVisible(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={() => setDetailsVisible(false)}>hide</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>
          {blog.user?.name || "unknown"}
        </div>
    </div>
    </div> 
  )
}

export default Blog
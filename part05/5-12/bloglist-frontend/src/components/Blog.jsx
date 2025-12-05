import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {

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

  const loggedUserJSON = window.localStorage
    .getItem('loggedNoteappUser')
  const user = JSON.parse(loggedUserJSON)

  const addLike = () => {
    // console.log('clicked')
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, updatedBlog)
    // console.log(blog)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
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
          {blog.user?.name || 'unknown'}
        </div>
        {blog.user?.name === user.name &&
          <div>
            <button onClick={handleRemove}>remove</button>
          </div>}
      </div>
    </div>
  )
}

export default Blog
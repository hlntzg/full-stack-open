import { useState } from 'react'

const Blog = ({ blog }) => {

  console.log(blog)

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
          <button>like</button>
        </div>
        <div>
          {blog.user?.name || "unknown"}
        </div>
    </div>
    </div> 
  )
}

export default Blog
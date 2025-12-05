import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  // handle the first loading of the page
  useEffect(() => {
    const loggedUserJSON = window.localStorage
      .getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      // console.log(user)
      setUsername('')
      setPassword('')
      // console.log('logging in with', username, password)
    } catch {
      setErrorMessage('wrong username or pasword')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNewBlog = async (blogObject) => {
    // event.preventDefault()

    blogFormRef.current.toggleVisibility()

    try{
      // const newBlog = { title, author, url }
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog)) // add the new blog to the list

      setSuccessMessage(`a new blog "${blogObject.title}" by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      // reset the form fields
      // setTitle('')
      // setAuthor('')
      // setUrl('')
    } catch {
      setErrorMessage('failed to create a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage
      .removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
            <p>{user.name} logged in 
              <button onClick={handleLogout}>
                logout
              </button>
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                // onSubmit={addNewBlog}
                // title={title}
                // author={author}
                // url={url}
                // handleTitleChange={({ target }) => setTitle(target.value)}
                // handleAuthorChange={({ target }) => setAuthor(target.value)}
                // handleUrlChange={({ target }) => setUrl(target.value)}
                createBlog={addNewBlog}
              />
            </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
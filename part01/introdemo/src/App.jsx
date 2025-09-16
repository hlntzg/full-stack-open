import { useState } from "react"

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/hlntzg'>hlntzg</a> ♡
    </div>
  )
}

const App = () => {
  const [ counter, setCounter] = useState(0)

  // The function passed as the first parameter to the setTimeout 
  // function is invoked one second after calling the setTimeout function
  // setTimeout(
  //   () => setCounter(counter + 1), 
  //   1000
  // )

  const handleClick = () => {
    console.log('clicked')
    setCounter(counter + 1)
  }
  // console.log('rendering...', counter)

  return (
    <div>
      {counter}
      <button onClick={handleClick}>
        add
      </button>
      <button onClick={() => setCounter(0)}> 
        reset
      </button>
      <Footer />
    </div>
  )
}
export default App
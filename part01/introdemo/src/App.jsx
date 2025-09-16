import { useState } from "react"

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/hlntzg'>hlntzg</a> ♡
    </div>
  )
}

const App = () => {
  const [ counter, setCounter] = useState(1)

  // The function passed as the first parameter to the setTimeout 
  // function is invoked one second after calling the setTimeout function
  setTimeout(
    () => setCounter(counter + 1), 
    1000
  )

  // console.log('rendering...', counter)

  return (
    <div>
      {counter}
      <Footer />
    </div>
  )
}
export default App
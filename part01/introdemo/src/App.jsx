import { useState } from "react"

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [ counter, setCounter] = useState(0)

  // handle increase
  const increaseByOne = () => setCounter(counter + 1)
  // handle descrease
  const decreaseByOne = () => setCounter(counter - 1)
  // handle reset to zero
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />
    </div>
  )
}
export default App
import { useState } from "react"

// const Display = ({ counter }) => {
//   return (
//     <div>{counter}</div>
//   )
// }
const Display = ({ counter }) => <div>{counter}</div>

// const Button = (props) => {
//   return (
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   )
// }
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [ counter, setCounter] = useState(0)
  // console.log('rendering with counter value', counter)

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
        onClick={increaseByOne} // event handler
        text='plus'
      />
      <Button
        onClick={setToZero} // event handler
        text='zero'
      />     
      <Button
        onClick={decreaseByOne} // event handler
        text='minus'
      />
    </div>
  )
}
export default App
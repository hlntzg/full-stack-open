import { useState } from "react"

// conditional rendering: component renders completely different 
// React elements depending on the state of the application
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
  }

  const handleResetClick = () => {
    setAll([])
    setLeft(0)
    setRight(0)
  }

  return (
    <div>
      {left}
      <Button
        onClick={handleLeftClick}
        text='left'
      />
      <Button 
        onClick={handleRightClick}
        text='right'
      />
      {right}
      <History allClicks={allClicks} />
      <button onClick={handleResetClick}>Reset</button>
    </div>
  )
}

export default App
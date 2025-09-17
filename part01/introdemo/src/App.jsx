import { useState } from "react"

// State update in React happens asynchronously, 
// i.e. not immediately but "at some point" before the component is rendered again

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  // concat method: does not mutate the existing array but rather 
  // returns a new copy of the array with the item added to it.
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    // console.log('left before', left)
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    // console.log('left after', updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  }
  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })

  // const handleLeftClick = () =>
  //   setClicks({ ...clicks, left: clicks.left + 1 })

  // const handleRightClick = () =>
  //   setClicks({ ...clicks, right: clicks.right + 1 })

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>Total: {total}</p>
    </div>
  )
}

export default App
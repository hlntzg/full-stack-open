import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={all} />
      <Display text="average" value={average} />
      <Display text="positive" value={positive + " %"} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={() => setGood(good + 1)}
        text='good'
      />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text='neutral'
      />
       <Button
        onClick={() => setBad(bad + 1)}
        text='bad'
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App


const Hello = (props) => {

  console.log(props)

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/hlntzg'>hlntzg</a> ♡
    </div>
  )
}

const App = () => {
  const name = 'peter'
  const age = 11
  return (
    <>
      <h1>Greetings</h1>
      <Hello 
        name='bob'
        age={10}
      />
      <Hello name={name} age={age}/>
      <Footer />
    </>
  )
}
export default App
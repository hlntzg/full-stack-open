// const Hello = ( props) => {
const Hello = ({ name, age }) => {

  // console.log(props)
  console.log({ name, age })
  
  // full form:
  // const name = props.name;
  // const age = props.age;
  // compact form (JavaScript):
  // const { name, age } = props;

  // const bornYear = () => new Date().getFullYear() - age // compact syntax form for arrow function
  const bornYear = () => {
    const yearNow = new  Date().getFullYear();
    return (yearNow - age)
  }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/hlntzg'>hlntzg</a> ♡
    </div>
  )
}

const App = () => {
  const name = 'peter'
  const age = 25
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
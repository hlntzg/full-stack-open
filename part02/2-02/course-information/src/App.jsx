
const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
} 

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

// Array.prototype.reduce
// .reduce() takes a running sum (starts at 0) and adds each part.exercises to it
// reduce(callbackFn)
// reduce(callbackFn, initialValue)
const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  console.log(props)
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div><p>Number of exercises {total}</p></div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Relux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return <Course course={course} />
}

export default App
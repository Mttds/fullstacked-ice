import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//function App2() {
//  const [count, setCount] = useState(0)
//
//  return (
//    <>
//      <div>
//        <a href="https://vitejs.dev" target="_blank">
//          <img src={viteLogo} className="logo" alt="Vite logo" />
//        </a>
//        <a href="https://react.dev" target="_blank">
//          <img src={reactLogo} className="logo react" alt="React logo" />
//        </a>
//      </div>
//      <h1>Vite + React</h1>
//      <div className="card">
//        <button onClick={() => setCount((count) => count + 1)}>
//          count is {count}
//        </button>
//        <p>
//          Edit <code>src/App.jsx</code> and save to test HMR
//        </p>
//      </div>
//      <p className="read-the-docs">
//        Click on the Vite and React logos to learn more
//      </p>
//    </>
//  )
//}

// usually d is called props, but it's just a dictionary/object
// with the keys defined in the component JSX call
//const Hello = (d) => { 
//  return (
//    <div>
//      <p>Hello {d.name}, you are {d.age}</p>
//    </div>
//  )
//}

//const App = () => {
//  const now = new Date()
//  const a = 10
//  const b = 20
//  console.log(now, a+b)
//
//  return (
//    <div>
//      <Hello name='Daisy' age={26+2}/>
//      <Hello name='George' age={b}/>
//      <p>Hello world, it is {now.toString()}</p>
//      <p>
//        {a} plus {b} is {a + b}
//      </p>
//    </div>
//  )
//}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((acc, val) => acc + val.exercises, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const avg = (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all
  const pos = (props.good / props.all) * 100

  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <table align='center'>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.all} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={pos + "%"} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [anectodeVotes, setAnectodeVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomAnectode = () => {
    const rand = Math.floor(Math.random() * (anecdotes.length - 1))
    console.log(rand);
    setSelected(rand)
  }

  const incrementAnectodeVote = () => {
    const copy = [...anectodeVotes]
    copy[selected] += 1
    setAnectodeVotes(copy)
  }

  const getMostVotedAnectode = () => {
    const mostVoted = anectodeVotes.indexOf(Math.max(...anectodeVotes))
    return `${anecdotes[mostVoted]} has ${anectodeVotes[mostVoted]} votes`
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <br/>
      <br/>

      <div>
        <h2>Anectode of the day</h2>
        {anecdotes[selected]}
        <br/>
        Has {anectodeVotes[selected]} votes
        <br/>
        <Button onClick={incrementAnectodeVote} text="vote" />
        <Button onClick={getRandomAnectode} text="next anectode" />

        <h2>Anectode with most votes</h2>
        {getMostVotedAnectode()}
      </div>

      <h1>Give Feedback</h1>
      <Button onClick={() => {setGood(good+1); setAll(all+1)}}       text="good" />
      <Button onClick={() => {setNeutral(neutral+1); setAll(all+1)}} text="neutral" />
      <Button onClick={() => {setBad(bad+1); setAll(all+1)}}         text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App

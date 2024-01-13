import { useState } from "react"
import './app.css'

const Heading = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ name, onClick }) => {
  return <button onClick={() => onClick(name)}>{name}</button>
}

const Stat = ({ stat, count }) => {
  return (
    <tr>
      <td><p>{stat}: {count}{stat === 'Positive' && '%'}</p></td>
    </tr>
  )
}

const Table = ({ heading, good, bad, neutral }) => {
  return (
    <table className="statistics">
      <thead>
        <tr>
          <th>{heading}</th>
        </tr>
      </thead>
      <tbody>
        <Stat stat="Good" count={good} />
        <Stat stat="Neutral" count={neutral} />
        <Stat stat="Bad" count={bad} />
        <Stat stat="All" count={good + bad + neutral} />
        <Stat stat="Average" count={((good + bad + neutral) / 3)} />
        <Stat stat="Positive" count={((good / (good + bad + neutral)))} />
      </tbody>
    </table>
  )
}




function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleIncrease = (type) => {
    switch (type) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
    }

  }

  return (
    <div>
      <Heading title="Give Feedback" />
      <Button name="good" onClick={handleIncrease} />
      <Button name="neutral" onClick={handleIncrease} />
      <Button name="bad" onClick={handleIncrease} />
      {good + bad + neutral === 0 ? <p>No feedback given</p> :
        (
          <Table heading="Statistics" good={good} bad={bad} neutral={neutral}/>
        )
      }



    </div>
  )
}

export default App

import { useState } from "react"

const Heading = ({title}) => {
  return <h1>{title}</h1>
}

const Button = ({name, onClick}) => {
  return <button onClick={() => onClick(name)}>{name}</button>
}

const Stat = ({stat, count}) => {
  return <p>{stat}: {count}</p>
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleIncrease = (type) => {
    switch(type){
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
    <Heading title="Give Feedback"/>
      <Button name="good" onClick={handleIncrease}/>
      <Button name="neutral" onClick={handleIncrease}/>
      <Button name="bad" onClick={handleIncrease}/>
      <Heading title="Statistics"/>
      <Stat stat="Good" count={good}/>
      <Stat stat="Neutral" count={neutral}/>
      <Stat stat="Bad" count={bad}/>

    </div>
  )
}

export default App

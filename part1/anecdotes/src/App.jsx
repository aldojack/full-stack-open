import { useState } from "react";

function App() {
  const ancedotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [points, setPoints] = useState(new Array(ancedotes.length).fill(0));
  let highestIndex = points.indexOf(Math.max(...points));
  const getRandomAncedote = () => {
    return Math.floor(Math.random() * ancedotes.length);
  };

  const handleIncrease = () => {
    const copiedPoints = [...points];
    copiedPoints[selected] = copiedPoints[selected] + 1;
    setPoints(copiedPoints);
  };

  const [selected, setSelected] = useState(0);

  return (
    <div>
      <h1>Ancedote of the day</h1>
      <p>{ancedotes[selected]}</p>
      <p>votes:{points[selected]}</p>
      <br />
      <button onClick={handleIncrease}>Vote</button>
      <button onClick={() => setSelected(getRandomAncedote)}>
        Get random ancedote
      </button>
      <h1>Ancedote with the most votes</h1>
      <p>{ancedotes[highestIndex]}</p>
    </div>
  );
}

export default App;

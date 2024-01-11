const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ exercises }) => {
  const mappedContent = exercises.map((exercise, index) => {
    return (
      <Part key={index} part={exercise.part} exercise={exercise.exercise} />
    );
  });

  return <div>{mappedContent}</div>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part}: {exercise}
    </p>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";

  const exercises = [
    { part: "Fundamentals of React", exercise: 10 },
    { part: "Using props to pass data", exercise: 7 },
    { part: "State of a component", exercise: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total total={exercises.length} />
    </div>
  );
};

export default App;

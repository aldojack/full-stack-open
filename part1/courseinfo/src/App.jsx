const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ exercises }) => {
  const mappedContent = exercises.map((exercise, index) => {
    return (
      <Part key={index} name={exercise.name} exercise={exercise.exercise} />
    );
  });

  return <div>{mappedContent}</div>;
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name}: {exercise}
    </p>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {

  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercise: 10 },
      { name: "Using props to pass data", exercise: 7 },
      { name: "State of a component", exercise: 14 },
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total total={course.parts.length} />
    </div>
  );
};

export default App;

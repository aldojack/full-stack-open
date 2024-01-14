import React from 'react'

const Total = ({ exercises }) => {
  let total = exercises.map(exercise => exercise.exercises)
    .reduce((total, next) => total += next);

  return <p>Number of exercises {total}</p>;
};


export default Total
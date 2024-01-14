import React from 'react'

const Total = ({ exercises }) => {
  let total = exercises.map(exercise => exercise.exercises)
    .reduce((total, next) => total += next);

  return <p><strong>Number of exercises {total}</strong></p>;
};


export default Total
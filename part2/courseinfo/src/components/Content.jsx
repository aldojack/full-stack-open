import React from 'react'
import Part from './Part'

const Content = ({ exercises }) => {
    const mappedContent = exercises.map((exercise) => {
      return (
        <Part key={exercise.id} name={exercise.name} exercises={exercise.exercises} />
      );
    });
  
    return <div>{mappedContent}</div>;
  };

export default Content
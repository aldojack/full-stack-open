import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

function Course({course}) {
    return (
        <div>
            <Header course={course.name} />
            <Content exercises={course.parts} />
            {/* <Total total={course.parts.length} /> */}
        </div>
    )
}

export default Course
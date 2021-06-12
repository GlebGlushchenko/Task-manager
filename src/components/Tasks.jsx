import React from 'react'
import { Route } from 'react-router-dom'

const Tasks = ({ tasks }) => {
  return (
    <div className="todo__tasks">
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <Route path={`/task/${task.id}`}>
              <h1>{task.title}</h1>
              <div>{task.description}</div>
            </Route>
          </div>
        )
      })}
    </div>
  )
}

export default Tasks

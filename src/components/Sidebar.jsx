import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = ({ tasks, handlerAddTask, handlerDeletTask }) => {
  const [title, setTitle] = React.useState('')
  const [disc, setDisc] = React.useState('')

  const handlerForm = () => {
    handlerAddTask(title, disc)
    setTitle('')
    setDisc('')
  }

  return (
    <div className="todo__sidebar">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <Link to={`/task/${task.id}`}>
                {task.title}
                <span>{task.date}</span>
                <span onClick={() => handlerDeletTask(task.id)}>Delete</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div>
        <input onChange={(e) => setTitle(e.currentTarget.value)} value={title} type="text" />
        <input onChange={(e) => setDisc(e.currentTarget.value)} value={disc} type="text" />
        <button onClick={handlerForm}>ADD</button>
      </div>
    </div>
  )
}

export default Sidebar

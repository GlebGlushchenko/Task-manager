import React from 'react'
import { tasksAPI } from './api/api'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'

function App() {
  const [tasks, setTasks] = React.useState(null)
  const getTask = () => {
    return tasksAPI.getTasks().then((data) => {
      setTasks(data)
    })
  }
  React.useEffect(() => {
    getTask()
  }, [])

  const handlerAddTask = (title, disc) => {
    tasksAPI.addTask(title, disc).then(() => {
      getTask()
    })
  }

  const handlerDeletTask = (id) => {
    tasksAPI.deleteTask(id).then(() => {
      getTask()
    })

    // setTasks((prev) => prev.filter((task) => task.id !== id))
    // console.log(tasks)
  }

  return (
    <div className="todo">
      {tasks && (
        <Sidebar
          handlerDeletTask={handlerDeletTask}
          handlerAddTask={handlerAddTask}
          tasks={tasks}
        />
      )}
      {tasks && <Tasks tasks={tasks} />}
    </div>
  )
}

export default App

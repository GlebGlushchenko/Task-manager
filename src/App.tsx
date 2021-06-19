import React from 'react'

import { tasksAPI } from './api/api'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import { singleTaskType } from './Types/types'
import { AppWrapper } from './components/StyledComponent/AppWrapperStyles'

let order = 0

const App: React.FC = () => {
  const [tasks, setTasks] = React.useState<singleTaskType[]>([])
  const [loading, setLoading] = React.useState(false)
  const getTask = () => {
    setLoading(true)
    return tasksAPI
      .getTasks()
      .then((data: any) => {
        setTasks(data)
      })
      .then(() => {
        setLoading(false)
      })
  }
  React.useEffect(() => {
    getTask()
  }, [])

  const handlerAddTask = (title: string, disc: string, date: string) => {
    const task: singleTaskType = {
      title: title,
      id: Date.now(),
      complete: false,
      description: disc,
      date: !date ? 3 : parseInt(date),
      order: ++order,
    }

    tasksAPI.addTask(task).then(() => {
      getTask()
    })
  }

  const deleteTask = (id: number) => {
    tasksAPI.deleteTask(id).then(() => {
      getTask()
    })
  }

  const complitedTask = (id: number) => {
    tasksAPI.completeTask(id).then(() => {
      getTask()
    })
  }

  const editTaskTitle = (id: number, text: string) => {
    tasksAPI.editTitle(id, text).then(() => {
      getTask()
    })
  }

  const editTaskDisc = (id: number, text: string) => {
    tasksAPI.editDisc(id, text).then(() => {
      getTask()
    })
  }

  const taskSort = (task: singleTaskType, currentTask: singleTaskType) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          tasksAPI.sortTask(task.id, currentTask.order).then(() => {
            getTask()
          })
        }
        if (t.id === currentTask.id) {
          tasksAPI.sortTask(currentTask.id, task.order).then(() => {
            getTask()
          })
        }
        return t
      }),
    )
  }

  return (
    <AppWrapper>
      {tasks && (
        <Sidebar
          taskSort={taskSort}
          deleteTask={deleteTask}
          handlerAddTask={handlerAddTask}
          tasks={tasks}
          loading={loading}
        />
      )}
      {tasks && (
        <Tasks
          editTaskDisc={editTaskDisc}
          editTaskTitle={editTaskTitle}
          complitedTask={complitedTask}
          tasks={tasks}
        />
      )}
    </AppWrapper>
  )
}

export default App

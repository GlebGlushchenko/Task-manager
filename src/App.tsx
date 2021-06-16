import React from 'react'
import { tasksAPI } from './api/api'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import { singleTaskType } from './Types/types'
import styled from 'styled-components'

const AppWrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 830px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  box-shadow: 5px 2px 10px #f4f6f8;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
`

const App: React.FC = () => {
  let order = 0
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
          debugger
          tasksAPI.sortTask(task.id, currentTask.order).then(() => {
            getTask()
          })
        }
        if (t.id === currentTask.id) {
          debugger
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

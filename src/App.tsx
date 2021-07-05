import React from 'react'

import { tasksAPI } from './api/api'
import { singleTaskType } from './Types/types'
import { AppBar, Container, Toolbar, Typography, Box, makeStyles } from '@material-ui/core'
import Todos from './components/Todos'
import InProgress from './components/InProgress'
import Complited from './components/Complited'
import Modal from './components/Modal/Modal'

import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'

const App: React.FC = () => {
  const [tasks, setTasks] = React.useState<singleTaskType[]>([])
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState(null)
  const location = useLocation()
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

  const handlerAddTask = (title: string, disc: string, date: number) => {
    const task: singleTaskType = {
      title: title,
      id: Date.now(),
      complete: false,
      description: disc,
      date: !date ? 3 : date,
      order: Date.now(),
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

  const editTaskTitle = (id: any, text: string) => {
    tasksAPI.editTitle(id, text).then(() => {
      getTask()
    })
  }

  const editTaskDisc = (id: any, text: string) => {
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
  const useStyle = makeStyles((theme) => ({
    container: {
      marginTop: 100,
      marginBottom: 100,
      display: 'flex',
      minHeight: 250,
      height: 100,
      justifyContent: 'space-around',
    },
  }))

  const classes = useStyle()
  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlerComplited = (id) => {
    complitedTask(id)
    setOpen(false)
  }

  const handlerRemove = (id) => {
    if (window.confirm('You want to delete the task?')) deleteTask(id)
  }

  return (
    <>
      <Container>
        <AppBar position="fixed">
          <Container>
            <Toolbar>
              <Box>
                <Typography variant="h5">Todo</Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container className={classes.container}>
          {tasks && (
            <Todos
              handleClickOpen={handleClickOpen}
              tasks={tasks}
              handlerAddTask={handlerAddTask}
              taskSort={taskSort}
            />
          )}

          <InProgress />
          <Complited tasks={tasks} handleClickOpen={handleClickOpen} />
        </Container>
      </Container>
      {tasks.map((t) => {
        if (t.id === id || location.pathname.substr(1) === t.title) {
          return (
            <Route path={`/${t.title}`}>
              <Modal
                id={t.id}
                open={open}
                handleClose={handleClose}
                handlerComplited={handlerComplited}
                handlerRemove={handlerRemove}
                editTaskTitle={editTaskTitle}
                editTaskDisc={editTaskDisc}
                setOpen={setOpen}
                title={t.title}
                description={t.description}
                date={t.date}
              />
            </Route>
          )
        }
      })}
    </>
  )
}

export default App

import React from 'react'

import { tasksAPI } from './api/api'

import { singleTaskType } from './Types/types'
import { AppBar, Container, Toolbar, Typography, Box, makeStyles } from '@material-ui/core'
import { Route } from 'react-router-dom'

import Todos from './components/Todos'
import InProgress from './components/InProgress'
import Complited from './components/Complited'
import Modal from './components/Modal/Modal'

const App: React.FC = () => {
  const [tasks, setTasks] = React.useState<singleTaskType[]>([])
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState(null)
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
      id: Date.now().toString(),
      complete: false,
      description: disc,
      date: !date ? 3 : date,
      order: Date.now(),
    }

    tasksAPI.addTask(task).then(() => {
      getTask()
    })
  }

  const deleteTask = (id: string) => {
    tasksAPI.deleteTask(id).then(() => {
      getTask()
    })
  }

  const complitedTask = (id: string) => {
    tasksAPI.completeTask(id).then(() => {
      getTask()
    })
  }

  const editTaskTitle = (id: string, text: string) => {
    tasksAPI.editTitle(id, text).then(() => {
      getTask()
    })
  }

  const editTaskDisc = (id: string, text: string) => {
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
              loading={loading}
            />
          )}

          <InProgress />
          <Complited loading={loading} tasks={tasks} handleClickOpen={handleClickOpen} />
        </Container>
      </Container>
      {tasks.map((t: singleTaskType) => {
        if (t.id === id) {
          return (
            <Route key={t.id} path={'/' + t.id}>
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
                complete={t.complete}
              />
            </Route>
          )
        } else return null
      })}
    </>
  )
}

export default App

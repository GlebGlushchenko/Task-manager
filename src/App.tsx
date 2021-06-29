import React from 'react'

import { tasksAPI } from './api/api'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import { singleTaskType } from './Types/types'
import styled from 'styled-components'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  makeStyles,
  Paper,
  Grid,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Todo from './components/Todo'
import InProgress from './components/InProgress'
import Complited from './components/Complited'
import Modal from './components/Modal/Modal'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

// const AppWrapper = styled.div`
//   height: 100vh;
//   padding: 10px;
//   display: flex;
//   width: 1200px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   -webkit-transform: translate(-50%, -50%);
//   -moz-transform: translate(-50%, -50%);
//   -ms-transform: translate(-50%, -50%);
//   -o-transform: translate(-50%, -50%);
//   box-shadow: 5px 2px 10px #f4f6f8;
//   border-radius: 10px;
//   -webkit-border-radius: 10px;
//   -moz-border-radius: 10px;
//   -ms-border-radius: 10px;
//   -o-border-radius: 10px;
// `

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

  const handlerAddTask = (title: string, disc: string, date: number) => {
    const task: singleTaskType = {
      title: title,
      id: Date.now(),
      complete: false,
      description: disc,
      date: !date ? 3 : date,
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
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState(null)
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
    deleteTask(id)
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
            <Todo handleClickOpen={handleClickOpen} tasks={tasks} handlerAddTask={handlerAddTask} />
          )}

          <InProgress />
          <Complited tasks={tasks} />
        </Container>
      </Container>
      {tasks.map((t) => {
        if (t.id === id) {
          return (
            <Modal
              id={id}
              description={t.description}
              title={t.title}
              open={open}
              handleClose={handleClose}
              t={t}
              handlerComplited={handlerComplited}
              handlerRemove={handlerRemove}
              editTaskTitle={editTaskTitle}
              editTaskDisc={editTaskDisc}
              setOpen={setOpen}
              date={t.date}
            />
          )
        }
      })}
    </>
  )
}

export default App

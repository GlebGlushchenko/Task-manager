import React from 'react'
import clsx from 'clsx'
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
import Button from '@material-ui/core/Button'
import { TodosProps } from '../Types/types'
import Todo from './Todo'

import { handlerKeyPress } from '../utils/keyCodeHandler'

import { singleTaskType } from '../Types/types'

const useStyle = makeStyles((theme) => ({
  itemWrapper: { display: 'flex' },
  items: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: 15,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    marginTop: 100,
    marginBottom: 100,
    display: 'flex',
    minHeight: 400,
    height: 'auto',
    justifyContent: 'space-around',
  },
  todo: {
    display: 'flex',
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    paddingLeft: 100,
    paddingRight: 100,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    textAlign: 'center',

    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  },
  btnWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10 },
  textTodoInp: { marginBottom: 20, marginTop: 20, width: 250 },
  textTodoBtn: { width: 100 },
  date: { width: 50, marginBottom: 20 },

  endTime: {
    backgroundColor: '#df7d57',
    '&:hover': {
      backgroundColor: '#e7ac94',
    },
  },
}))

const Todos: React.FC<TodosProps> = ({ tasks, handlerAddTask, handleClickOpen, taskSort }) => {
  const [currentTask, setCurrentTask] = React.useState<singleTaskType[]>([])
  const classes = useStyle()

  const [title, setTitle] = React.useState<string>('')
  const handlerTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const [date, setDate] = React.useState<string>('')
  const handlerDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const handlerForm = () => {
    if (!title.trim()) {
      alert('Please enter text title and disc')
    } else {
      handlerAddTask(title, 'sda', parseInt(date))
      setTitle('')
      setDate('')
    }
  }

  const sortTask = (a: any, b: any) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <Grid className={classes.itemWrapper} container>
      <Paper className={classes.items}>
        <Grid className={classes.item} item md={4}>
          <Box>
            <h2>Todo</h2>
          </Box>
          {tasks.sort(sortTask).map((todo) => {
            if (!todo.complete) {
              return (
                <Todo
                  key={todo.id}
                  handleClickOpen={handleClickOpen}
                  setCurrentTask={setCurrentTask}
                  currentTask={currentTask}
                  task={todo}
                  taskSort={taskSort}
                />
              )
            }
          })}

          <Box className={classes.btnWrapper}>
            <TextField
              label="Text"
              value={title}
              onChange={handlerTextInput}
              className={classes.textTodoInp}
              type="text"
            />
            <TextField
              value={date}
              onChange={handlerDate}
              className={classes.date}
              type="number"
              label="Date"
              onKeyPress={(e) => {
                handlerKeyPress(e, handlerForm)
              }}
            />
            <Button
              onClick={handlerForm}
              className={classes.textTodoBtn}
              variant="contained"
              color="primary">
              SEND
            </Button>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  )
}
export default Todos

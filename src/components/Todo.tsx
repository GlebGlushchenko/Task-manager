import React from 'react'
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
import { TodoProps } from '../Types/types'

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
}))

const Todo: React.FC<TodoProps> = ({ tasks, handlerAddTask, handleClickOpen }) => {
  const classes = useStyle()

  const helper = (str: string) => {
    return str.substr(0, 10) + '...'
  }

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
  return (
    <Grid className={classes.itemWrapper} container>
      <Paper className={classes.items}>
        <Grid className={classes.item} item md={4}>
          <Box>
            <h2>Todo</h2>
          </Box>
          {tasks.map((todo) => {
            if (!todo.complete) {
              return (
                <Box
                  onClick={() => {
                    handleClickOpen(todo.id)
                  }}>
                  <Paper key={todo.id} className={classes.todo}>
                    {todo.title.length >= 15 ? helper(todo.title) : todo.title}
                  </Paper>
                </Box>
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
export default Todo

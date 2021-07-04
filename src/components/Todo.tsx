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
import { TodoProps } from '../Types/types'

import { handlerKeyPress } from '../utils/keyCodeHandler'

import { singleTaskType } from '../Types/types'

const useStyle = makeStyles((theme) => ({
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

  endTime: {
    backgroundColor: '#df7d57',
    '&:hover': {
      backgroundColor: '#e7ac94',
    },
  },
}))

const Todo: React.FC<TodoProps> = ({
  task,
  handleClickOpen,
  currentTask,
  taskSort,
  setCurrentTask,
}) => {
  const classes = useStyle()
  const dragStartHandler = (e: any, task: any) => {
    setCurrentTask(task)
  }
  const dragEndHandler = (e: any) => {
    e.target.style.opacity = 1
  }
  const dragOverHandler = (e: any) => {
    e.target.style.opacity = 0.5
    e.preventDefault()
  }
  const dropHandler = (e: any, task: any) => {
    e.preventDefault()
    taskSort(task, currentTask)
  }
  const helper = (str: string) => {
    return str.substr(0, 10) + '...'
  }
  return (
    <Box
      onClick={() => {
        handleClickOpen(task.id)
      }}>
      <Paper
        draggable={true}
        onDragStart={(e) => dragStartHandler(e, task)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, task)}
        key={task.id}
        className={clsx(classes.todo, task.date <= 3 && classes.endTime)}>
        {task.title.length >= 15 ? helper(task.title) : task.title}
      </Paper>
    </Box>
  )
}
export default Todo

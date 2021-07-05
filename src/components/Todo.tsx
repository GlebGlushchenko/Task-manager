import React from 'react'
import clsx from 'clsx'
import { Typography, Box, makeStyles, Paper } from '@material-ui/core'
import { TodoProps } from '../Types/types'

import { subString } from '../utils/subString'

import { BrowserRouter as Router, Link } from 'react-router-dom'

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

  return (
    <Box
      onClick={() => {
        handleClickOpen(task.id)
      }}>
      <Link to={`/${task.title}`}>
        <Paper
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, task)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, task)}
          key={task.id}
          className={clsx(classes.todo, task.date <= 3 && classes.endTime)}>
          <Typography> {task.title.length >= 15 ? subString(task.title) : task.title}</Typography>
        </Paper>
      </Link>
    </Box>
  )
}
export default Todo

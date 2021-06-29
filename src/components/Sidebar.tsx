import React from 'react'

import Task from './Task'
import ComplitedTasks from './ComplitedTasks'
import { singleTaskType } from '../Types/types'
import { SidebarPropsI } from '../Types/types'
import { handlerKeyPress } from '../utils/keyCodeHandler'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export const SidebarStyle = styled.div`
  background-color: #f4f6f8;
  width: 350px;
  border-right: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const StyleTaskList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Sidebar: React.FC<SidebarPropsI> = ({
  tasks,
  handlerAddTask,
  deleteTask,
  taskSort,
  loading,
}) => {
  const [title, setTitle] = React.useState('')
  const [disc, setDisc] = React.useState('')
  const [date, setDate] = React.useState('')

  const [currentTask, setCurrentTask] = React.useState<singleTaskType[]>([])

  const handlerForm = () => {
    if (!title.trim() && !disc.trim()) {
      alert('Please enter text title and disc')
    } else {
      handlerAddTask(title, disc, parseInt(date))
      setTitle('')
      setDisc('')
      setDate('')
    }
  }
  const handlerDeletTask = (e: any, id: number) => {
    const conf = window.confirm('Are you sure you want to delete?')
    e.stopPropagation()
    e.preventDefault()
    conf && deleteTask(id)
  }

  const sortTask = (a: any, b: any) => {
    if (a.order > b.order || a.date > b.date) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <SidebarStyle>
      <StyleTaskList>
        <h2 className={'sidebar__title'}>{loading ? 'Loading...' : 'Tasks'}</h2>
        <ul className={'list'}>
          {tasks.length === 0 ? (
            <h2>NO TASKs</h2>
          ) : (
            tasks.sort(sortTask).map((task: singleTaskType) => {
              if (!task.complete) {
                return (
                  <Task
                    key={task.id}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    task={task}
                    handlerDeletTask={handlerDeletTask}
                    taskSort={taskSort}
                  />
                )
              } else return null
            })
          )}
          {}
        </ul>
        <div>
          <h2 className="complited__task-title">Complited Task</h2>
          <ul className="list">
            {tasks.map((task: singleTaskType) => {
              if (task.complete) {
                return (
                  <ComplitedTasks key={task.id} handlerDeletTask={handlerDeletTask} task={task} />
                )
              } else return null
            })}
          </ul>
        </div>
      </StyleTaskList>
      <div className={'form'}>
        <TextField
          // className={'form__title'}
          placeholder={'Title'}
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
          type="text"
          onKeyPress={(e) => {
            handlerKeyPress(e, handlerForm)
          }}
        />
        <TextField
          // className={'form__disc'}
          placeholder={'Disc'}
          onChange={(e) => setDisc(e.currentTarget.value)}
          value={disc}
          type="text"
          onKeyPress={(e) => {
            handlerKeyPress(e, handlerForm)
          }}
        />
        <TextField
          className={'form__date'}
          placeholder={'Date'}
          onChange={(e) => setDate(e.currentTarget.value.trim())}
          value={date}
          type="number"
          variant="outlined"
          onKeyPress={(e) => {
            handlerKeyPress(e, handlerForm)
          }}
        />
        <Button variant="contained" color="primary" onClick={handlerForm}>
          ADD TASK
        </Button>
      </div>
    </SidebarStyle>
  )
}

export default Sidebar

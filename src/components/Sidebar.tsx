import React from 'react'

import Task from './Task'
import ComplitedTasks from './ComplitedTasks'
import { singleTaskType, taskType } from '../Types/types'
import { SidebarPropsI } from '../Types/types'
import styled from 'styled-components'
import { handlerKeyPress } from '../utils/keyCodeHandler'

const SidebarStyle = styled.div`
  background-color: #f4f6f8;
  width: 350px;
  border-right: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const StyleTask__list = styled.div`
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
    if (!title) {
      alert('Please enter text title')
    } else {
      handlerAddTask(title, disc, date)
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
      <StyleTask__list>
        <h2 className={'sidebar__title'}>{loading ? 'Loading...' : 'Tasks'}</h2>
        <ul className={'list'}>
          {tasks.map((t) => {})}
          {tasks.length === 0 ? (
            <h2>NO TAS2222KS</h2>
          ) : (
            tasks.sort(sortTask).map((task: taskType) => {
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
              }
            })
          )}
          {}
        </ul>
        <div>
          <h2>Выполненые таски</h2>
          <ul className="list">
            {tasks.map((task: singleTaskType) => {
              if (task.complete) {
                return (
                  <ComplitedTasks key={task.id} handlerDeletTask={handlerDeletTask} task={task} />
                )
              }
            })}
          </ul>
        </div>
      </StyleTask__list>
      <div className={'form'}>
        <input
          className={'form__title'}
          placeholder={'Title'}
          onChange={(e) => setTitle(e.currentTarget.value.trim())}
          value={title}
          type="text"
          onKeyPress={(e) => {
            handlerKeyPress(e, handlerForm)
          }}
        />
        <input
          className={'form__disc'}
          placeholder={'Disc'}
          onChange={(e) => setDisc(e.currentTarget.value.trim())}
          value={disc}
          type="text"
          onKeyPress={(e) => {
            handlerKeyPress(e, handlerForm)
          }}
        />
        <input
          className={'form__date'}
          placeholder={'Date'}
          onChange={(e) => setDate(e.currentTarget.value.trim())}
          value={date}
          type="number"
          onKeyPress={(e) => {
            handlerKeyPress(e, handlerForm)
          }}
        />
        <button className={'form__btn'} onClick={handlerForm}>
          ADD
        </button>
      </div>
    </SidebarStyle>
  )
}

export default Sidebar

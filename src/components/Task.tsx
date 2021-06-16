import React from 'react'
import styles from 'classnames'
import { Link } from 'react-router-dom'
import { singleTaskType, TaskPropsI, taskType } from '../Types/types'
import { TrashIcon } from './TrashIcon'
export const helper = (str: string) => {
  return str.substr(0, 10) + '...'
}
const Task: React.FC<TaskPropsI> = ({
  task,

  taskSort,
  currentTask,
  setCurrentTask,
  handlerDeletTask,
}) => {
  const dragStartHandler = (e: any, task: taskType) => {
    setCurrentTask(task)
  }
  const dragEndHandler = (e: any) => {
    e.target.style.opacity = 1
  }
  const dragOverHandler = (e: any) => {
    e.target.style.opacity = 0.5
    e.preventDefault()
  }
  const dropHandler = (e: any, task: taskType) => {
    e.preventDefault()
    taskSort(task, currentTask)
  }

  return (
    <li
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, task)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, task)}
      className={styles('list__item ', {
        'date__task-ends': task.date <= 3,
        'date__task-finish': task.date <= 0,
        task__complited: task.complete === true,
      })}
      key={task.id}>
      <Link to={`/task/${task.id}`}>
        <span className={'list__text'}>
          {task.title.length >= 10 ? helper(task.title) : task.title}
        </span>
        <span className={'list__date'}>{task.date} &#x23F1;</span>
        <TrashIcon id={task.id} handlerDeletTask={handlerDeletTask} />
      </Link>
    </li>
  )
}

export default Task

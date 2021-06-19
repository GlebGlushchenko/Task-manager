import React from 'react'
import styles from 'classnames'
import { Link } from 'react-router-dom'

import { ComplitedTasksPropsI } from '../Types/types'
import { TrashIcon } from '../components/TrashIcon'
import { helper } from './Task'

const ComplitedTasks: React.FC<ComplitedTasksPropsI> = ({ task, handlerDeletTask }) => {
  return (
    <li
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

export default ComplitedTasks

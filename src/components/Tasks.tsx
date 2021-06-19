import React from 'react'
import { Route } from 'react-router-dom'

import { TasksPropsI } from '../Types/types'
import penIcon from '../assets/pencil.png'

const Tasks: React.FC<TasksPropsI> = ({ tasks, complitedTask, editTaskTitle, editTaskDisc }) => {
  const [editTitle, setEditTitle] = React.useState(false)

  const handlerEditModTitle = () => {
    setEditTitle(!editTitle)
  }

  const [editDisc, setEditDisc] = React.useState(false)

  const handlerEditModDisc = () => {
    setEditDisc(!editDisc)
  }

  const [title, setTitle] = React.useState()

  const handlerChangeTitle = (e: any) => {
    setTitle(e.currentTarget.value)
  }

  const [disc, setDisc] = React.useState<string>()

  const handlerChangeDisc = (e: any) => {
    setDisc(e.target.value)
  }

  const handlerComplitTask = (id: number) => {
    complitedTask(id)
  }

  const helperChangeTitle = (id: number) => {
    if (title) {
      handlerEditModTitle()
      editTaskTitle(id, title)
    } else alert('Enter title text!')
  }

  const helperChangeDisc = (id: number) => {
    if (disc) {
      handlerEditModDisc()
      editTaskDisc(id, disc)
    } else alert('Enter disc text!')
  }

  return (
    <div className="todo__tasks">
      {tasks.length !== 0 ? (
        tasks.map((task) => {
          return (
            <div className="todo__task-item" key={task.id}>
              <Route path={`/task/${task.id}`}>
                <div className="todo__task-title">
                  {editTitle ? (
                    <input
                      className={'edit__title'}
                      onChange={(e) => handlerChangeTitle(e)}
                      onBlur={() => helperChangeTitle(task.id)}
                      value={title}
                      type="text"
                      placeholder={'New Title'}
                    />
                  ) : (
                    <h1>{task.title}</h1>
                  )}
                  <img
                    onClick={() => {
                      handlerEditModTitle()
                    }}
                    className="todo__task__title-icon"
                    src={penIcon}
                    alt=""
                  />
                </div>
                <div className="todo__task-disc">
                  {editDisc ? (
                    <textarea
                      className="todo__task-textarea"
                      onChange={(e) => handlerChangeDisc(e)}
                      onBlur={() => helperChangeDisc(task.id)}
                      value={disc}></textarea>
                  ) : (
                    <div>{task.description}</div>
                  )}

                  <img
                    onClick={() => {
                      handlerEditModDisc()
                    }}
                    className="todo__task__disc-icon"
                    src={penIcon}
                    alt=""
                  />
                </div>

                <button
                  className="tasks__btn"
                  onClick={() => {
                    handlerComplitTask(task.id)
                  }}>
                  Complit Task
                </button>
              </Route>
            </div>
          )
        })
      ) : (
        <h2>NO TASKS</h2>
      )}
    </div>
  )
}

export default Tasks

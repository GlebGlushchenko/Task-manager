import React from 'react'
import { Route } from 'react-router-dom'
import penIcon from '../assets/pencil.png'
import { TasksPropsI } from '../Types/types'

const Tasks: React.FC<TasksPropsI> = ({ tasks, complitedTask, editTaskTitle, editTaskDisc }) => {
  const [editTitle, setEditTitle] = React.useState(false)

  const handlerEditModTitle = (id?: number) => {
    setEditTitle(!editTitle)
  }

  const [editDisc, setEditDisc] = React.useState(false)

  const handlerEditModDisc = (id?: number) => {
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
    handlerEditModTitle()
    editTaskTitle(id, title)
  }

  const helperChangeDisc = (id: number) => {
    handlerEditModDisc()
    editTaskDisc(id, disc)
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
                      handlerEditModTitle(task.id)
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
                      handlerEditModDisc(task.id)
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

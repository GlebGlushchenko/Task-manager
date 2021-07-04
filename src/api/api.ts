import axios from 'axios'
import {singleTaskType} from '../Types/types'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})







export const tasksAPI = {
  getTasks() {
    return instance.get('/tasks').then((res) => {
      return res.data
    })
  },
  // ?&_sort=date&_order=asc

  addTask(task:singleTaskType) {
    return instance.post('/tasks', {
      ...task
    })
  },
  deleteTask(id:number) {
    return instance.delete(`/tasks/${id}`)
  },

  completeTask(id:number) {
    return instance.patch(`/tasks/${id}`, {
      complete: true,
    })
  },

  editTitle(id:number, text:string) {
    return instance.patch(`/tasks/${id}`, {
      title: text,
    })
  },
  editDisc(id:number, text:string) {
    return instance.patch(`/tasks/${id}`, {
      description: text,
    })
  },
  sortTask(id:number, order:number) {
    return instance.patch(`/tasks/${id}`, {
      order: order,
    })
  },
}

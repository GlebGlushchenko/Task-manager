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
  deleteTask(id:string) {
    return instance.delete(`/tasks/${id}`)
  },

  completeTask(id:string) {
    return instance.patch(`/tasks/${id}`, {
      complete: true,
    })
  },

  editTitle(id:string, text:string) {
    return instance.patch(`/tasks/${id}`, {
      title: text,
    })
  },
  editDisc(id:string, text:string) {
    return instance.patch(`/tasks/${id}`, {
      description: text,
    })
  },
  sortTask(id:string, order:number) {
    return instance.patch(`/tasks/${id}`, {
      order: order,
    })
  },
}

import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})

export const tasksAPI = {
  getTasks() {
    return instance.get('/tasks').then((res) => {
      return res.data
    })
  },
  addTask(title, disc) {
    return instance.post('/tasks', {
      title: title,
      id: Date.now(),
      complete: false,
      description: disc,
      date: 22,
    })
  },
  deleteTask(id) {
    return instance.delete(`/tasks/${id}`)
  },
}

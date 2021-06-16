import { type } from "os"

export type singleTaskType ={
    title: string,
    id: number,
    complete: boolean ,
    description: string,
    date: any,
    order: number,
   
  }

  export type taskType={
    title: string,
    id: number,
    complete: boolean ,
    description: string,
    date: any,
    order: number,
  }

  export interface SidebarPropsI {
    tasks: singleTaskType[]
    handlerAddTask(title: string, disc: string, date: string): void
    deleteTask(id: number): void
    taskSort(task: singleTaskType, currentTask: singleTaskType): void
    handlerDeletTask?:any,
    loading:boolean
  }

  export interface TasksPropsI {
    tasks: singleTaskType[],
    complitedTask(id:number): void,
    editTaskTitle(id: number,text:string| undefined):void,
    editTaskDisc(id: number ,text: string | undefined):void
    handlerDeletTask?:any
    
  }

  export interface ComplitedTasksPropsI {
    task: taskType
    handlerDeletTask(id:number,e?:any):void
    
  }

  export interface TaskPropsI{
      task:taskType |any,
    //   deleteTask(id:number):void,
      taskSort(task:taskType,currentTask:taskType):void,
      currentTask:any, 
      setCurrentTask:any,
      handlerDeletTask:(e:any,id:number) => void

  }

  export interface TrashIconProps{
      id:number
    handlerDeletTask:(e:any,id:number)=>void
  }
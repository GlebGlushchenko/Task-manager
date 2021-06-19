export type singleTaskType ={
    title: string,
    id: number,
    complete: boolean ,
    description: string,
    date: string | number,
    order: number,
   
  }
    export interface SidebarPropsI {
    tasks: singleTaskType[]
    handlerAddTask(title: string, disc: string, date: string): void
    deleteTask(id: number): void
    taskSort(task: singleTaskType, currentTask: singleTaskType): void
    handlerDeletTask?(id:number):void,
    loading:boolean
  }
  export interface TasksPropsI {
    tasks: singleTaskType[],
    complitedTask(id:number): void,
    editTaskTitle(id: number,text:string| undefined):void,
    editTaskDisc(id: number ,text: string | undefined):void
    handlerDeletTask?(e: any, id: number):void
   
    
  }

  export interface ComplitedTasksPropsI {
    task: singleTaskType
    handlerDeletTask(id:number,e?:any):void
    
  }

  export interface TaskPropsI{
      task:singleTaskType |any,
      taskSort(task:singleTaskType,currentTask:singleTaskType):void,
      currentTask:any, 
      setCurrentTask:any,
      handlerDeletTask:(e:any,id:number) => void

  }

  export interface TrashIconPropsI{
      id:number
    handlerDeletTask:(e:any,id:number)=>void
  }
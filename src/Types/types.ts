export type singleTaskType ={
    title: string,
    id: number,
    complete: boolean ,
    description: string,
    date:  number,
    order: number,
   
  }
    export interface SidebarPropsI {
    tasks: singleTaskType[]
    handlerAddTask(title: string, disc: string, date: number): void
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

  export interface TodoProps{
    tasks:singleTaskType[],
    handlerAddTask(title: string, disc: string, date: number): void
    handleClickOpen:(id:number)=>void
  }

  export interface ModalPorps{
    // tasks:singleTaskType[],
    open:any,
    handleClose:()=>void,
    id:number|null,
    title:string,
    description:string
    t:any
    handlerComplited:(id:any)=>void
    handlerRemove:(id:any)=>void,
    editTaskTitle(id: any,text:string| undefined):void,
    editTaskDisc(id: any ,text: string | undefined):void
    setOpen:any
    date:number
  }

  export interface ComplitedProps{
    tasks:singleTaskType[]
  }
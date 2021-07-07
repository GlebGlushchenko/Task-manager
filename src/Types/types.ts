export type singleTaskType ={
    title: string,
    id: string,
    complete: boolean ,
    description: string,
    date:  number,
    order: number,
   
  }

  export interface TodosProps{
    tasks:singleTaskType[],
    handlerAddTask(title: string, disc: string, date: number): void
    handleClickOpen:(id:string)=>void
    taskSort(task:singleTaskType,currentTask:singleTaskType):void,
    loading:boolean
  }


  export interface TodoProps{
    task:any,
    handleClickOpen:(id:string)=>void
    taskSort(task:singleTaskType,currentTask:any):void,
    currentTask:singleTaskType[], 
    setCurrentTask:(task:singleTaskType[])=>void,
  }
  export interface ModalPorps{
    open:boolean,
    handleClose?:()=>void,
    id:any,
    title:string,
    description:string
    handlerComplited:(id:string | null)=>void
    handlerRemove:(id:string | null)=>void,
    editTaskTitle(id: string | null,text:string| undefined):void,
    editTaskDisc(id: string | null ,text: string | undefined):void
    setOpen:(boolean)=> void
    date:number
    complete:boolean
  }

  export interface ComplitedProps{
    tasks:singleTaskType[]
    handleClickOpen:(id:string)=>void
    loading:boolean
   
  }
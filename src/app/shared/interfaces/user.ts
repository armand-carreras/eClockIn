import { Task } from './task';

export interface User extends Task{
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    currentTask?: Task,
    completedTaskList?: Task[],
    token?:string
}

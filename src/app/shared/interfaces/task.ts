
export interface Task {
    id?:string,
    name?: string,
    initDate?: Date,
    endDate?: Date,
    lastPausedDate?: Date,
    elapsed?: number,
    active?: boolean //true active, false paused
}

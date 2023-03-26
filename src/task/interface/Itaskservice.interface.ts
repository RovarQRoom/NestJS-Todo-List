
export interface ITaskServiceInterface {
    createTask(userId:string ,taskCreateDto: any): Promise<any>;
    getTasks(userId: any): Promise<any>;
    getTaskById(id: string, userId: any): Promise<any>;
    deleteTask(id: string, userId: any, taskDeleteDto:any): Promise<any>;
    updateTask(id: string, userId: any, taskUpdateDto:any): Promise<any>;
    updateTaskStatus(id: string, userId: any, taskUpdateStatusDto:any): Promise<any>;
}
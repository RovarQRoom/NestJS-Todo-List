
export interface ITaskServiceInterface {
    createTask(createTaskDto: any): Promise<any>;
    getTasks(user: any): Promise<any>;
    getTaskById(id: string, user: any): Promise<any>;
    deleteTask(id: string, user: any): Promise<any>;
    updateTask(id: string, user: any): Promise<any>;
    updateTaskStatus(id: string, status: any, user: any): Promise<any>;
}
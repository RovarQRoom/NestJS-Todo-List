

export interface ITaskRepositoryInterface {
    createTask(userId: any, taskCreateDto: any): Promise<any>;
    getTasks(userId: any): Promise<any>;
    getTaskById(id: string, userId: any): Promise<any>;
    deleteTask(id: string, userId: any, taskDeleteDto:any): Promise<any>;
    updateTask(id: string, userId: any, taskUpdateDto:any): Promise<any>;
}
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from '../Dtos/task.dto';

export interface ITaskServiceInterface {
    createTask(userId:string ,taskCreateDto: TaskCreateDto): Promise<TaskCreateDto>;
    getTasks(userId: string, page:number): Promise<any>;
    getTaskById(id: string, userId: string): Promise<any>;
    deleteTask(id: string, userId: string, taskDeleteDto:TaskDeleteDto): Promise<TaskDeleteDto>;
    updateTask(id: string, userId: string, taskUpdateDto:TaskUpdateDto): Promise<TaskUpdateDto>;
    updateTaskStatus(id: string, userId: string, taskUpdateStatusDto:TaskUpdateDto): Promise<TaskUpdateDto>;
}
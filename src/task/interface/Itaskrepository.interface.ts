import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from '../Dtos/task.dto';
import { Tasks } from '../../Model/TaskModel';


export interface ITaskRepositoryInterface {
    createTask(userId: string, taskCreateDto: TaskCreateDto): Promise<Tasks>;
    getTasks(userId: string, page:number): Promise<Tasks[]>;
    getTaskById(id: string, userId: string): Promise<Tasks>;
    deleteTask(id: string, userId: string, taskDeleteDto:TaskDeleteDto): Promise<Tasks>;
    updateTask(id: string, userId: string, taskUpdateDto:TaskUpdateDto): Promise<Tasks>;
}
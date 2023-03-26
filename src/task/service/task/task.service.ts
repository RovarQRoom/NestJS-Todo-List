import { Injectable } from '@nestjs/common';
import { ITaskServiceInterface } from '../../interface/Itaskservice.interface';
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto, TaskUpdateStatusDto } from 'src/task/Dtos/task.dto';
import { Tasks } from 'src/Model/TaskModel';

@Injectable()
export class TaskService implements ITaskServiceInterface {
    createTask(taskCreateDto: TaskCreateDto): Promise<Tasks> {
        throw new Error('Method not implemented.');
    }
    getTasks(userId: any): Promise<Tasks[]> {
        throw new Error('Method not implemented.');
    }
    getTaskById(id: string, userId: any): Promise<Tasks> {
        throw new Error('Method not implemented.');
    }
    deleteTask(id: string, userId: any, taskDeleteDto: TaskDeleteDto): Promise<Tasks> {
        throw new Error('Method not implemented.');
    }
    updateTask(id: string, userId: any, taskUpdateDto: TaskUpdateDto): Promise<Tasks> {
        throw new Error('Method not implemented.');
    }
    updateTaskStatus(id: string, userId: any, taskUpdateStatusDto: TaskUpdateStatusDto): Promise<Tasks> {
        throw new Error('Method not implemented.');
    }

}

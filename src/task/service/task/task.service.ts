import { Injectable } from '@nestjs/common';
import { ITaskServiceInterface } from '../../interface/Itaskservice.interface';

@Injectable()
export class TaskService implements ITaskServiceInterface {
    createTask(createTaskDto: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getTasks(user: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getTaskById(id: string, user: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    deleteTask(id: string, user: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateTask(id: string, user: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateTaskStatus(id: string, status: any, user: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

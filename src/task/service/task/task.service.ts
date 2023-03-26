import { Injectable, NotFoundException } from '@nestjs/common';
import { ITaskServiceInterface } from '../../interface/Itaskservice.interface';
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from 'src/task/Dtos/task.dto';
import { Tasks } from 'src/Model/TaskModel';
import { TaskRepository } from 'src/task/repository/task.repository';
import { ObjectId } from 'bson';

@Injectable()
export class TaskService implements ITaskServiceInterface {

    constructor(
        private readonly taskRepository: TaskRepository
        ){}
    
    async createTask(userId:string ,taskCreateDto: TaskCreateDto ): Promise<Tasks> {
        const createdTask = await this.taskRepository.createTask(userId, taskCreateDto);
        createdTask.save();

        return createdTask;
    }

    async getTasks(userId: any): Promise<Tasks[]> {
        if(!userId) throw new NotFoundException("User not found");

        const tasks = await this.taskRepository.getTasks(userId);
        return tasks;
    }

    async getTaskById(id: string, userId: any): Promise<Tasks> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        const task = await this.taskRepository.getTaskById(id, userId);
        return task;
    }

    async deleteTask(id: string, userId: any, taskDeleteDto: TaskDeleteDto): Promise<Tasks> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        taskDeleteDto.IsDeleted = true;
        taskDeleteDto.DeletedAt = new Date();
        const task = await this.taskRepository.deleteTask(id, userId, taskDeleteDto);
        return task;
    }

    async updateTask(id: string, userId: any, taskUpdateDto: TaskUpdateDto): Promise<Tasks> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        const task = await this.taskRepository.updateTask(id, userId, taskUpdateDto);
        return task;
    }

    async updateTaskStatus(id: string, userId: any, taskUpdateStatusDto: TaskUpdateDto): Promise<Tasks> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        taskUpdateStatusDto.IsDone = true;
        taskUpdateStatusDto.DoneDate = new Date();
        
        const task = await this.taskRepository.updateTask(id, userId, taskUpdateStatusDto);
        return task;
    }
    

}

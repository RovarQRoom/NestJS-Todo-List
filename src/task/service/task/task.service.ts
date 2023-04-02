import { Injectable, NotFoundException } from '@nestjs/common';
import { ITaskServiceInterface } from '../../interface/Itaskservice.interface';
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from 'src/task/Dtos/task.dto';
import { Tasks } from 'src/Model/TaskModel';
import { TaskRepository } from 'src/task/repository/task.repository';
import { ObjectId } from 'bson';
import { RabbitmqService } from '../../../rabbitmq/service/rabbitmq/rabbitmq.service';

@Injectable()
export class TaskService implements ITaskServiceInterface {

    constructor(
        private readonly rabbitMQService: RabbitmqService,
        private readonly taskRepository: TaskRepository
        ){}
    
    async createTask(userId:string ,taskCreateDto: TaskCreateDto ): Promise<TaskCreateDto> {
        const task = await this.taskRepository.createTask(userId, taskCreateDto);
        this.rabbitMQService.send('task_created', task);
        return taskCreateDto;
    }

    async getTasks(userId: any,page:number): Promise<Tasks[]> {
        if(!userId) throw new NotFoundException("User not found");

        const tasks = await this.taskRepository.getTasks(userId,page);
        return tasks;
    }

    async getTaskById(id: string, userId: any): Promise<Tasks> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        const task = await this.taskRepository.getTaskById(id, userId);
        return task;
    }

    async deleteTask(id: string, userId: any, taskDeleteDto: TaskDeleteDto): Promise<TaskDeleteDto> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        taskDeleteDto.IsDeleted = true;
        taskDeleteDto.DeletedAt = new Date();
        await this.taskRepository.deleteTask(id, userId, taskDeleteDto);

        return taskDeleteDto;
    }

    async updateTask(id: string, userId: any, taskUpdateDto: TaskUpdateDto): Promise<TaskUpdateDto> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        await this.taskRepository.updateTask(id, userId, taskUpdateDto);
        return taskUpdateDto;
    }

    async updateTaskStatus(id: string, userId: any, taskUpdateStatusDto: TaskUpdateDto): Promise<TaskUpdateDto> {
        if(!userId && !id && !ObjectId.isValid(id)) throw new NotFoundException("User not found");

        taskUpdateStatusDto.IsDone = true;
        taskUpdateStatusDto.DoneDate = new Date();
        console.log(taskUpdateStatusDto);
        

        await this.taskRepository.updateTask(id, userId, taskUpdateStatusDto);
        return taskUpdateStatusDto;
    }
    

}

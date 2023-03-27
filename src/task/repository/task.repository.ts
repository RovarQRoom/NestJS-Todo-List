import { Injectable, BadRequestException, CACHE_MANAGER, Inject } from '@nestjs/common';
import { ITaskRepositoryInterface } from "../interface/Itaskrepository.interface";
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from '../Dtos/task.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tasks } from '../../Model/TaskModel';
import { Cache } from 'cache-manager';
import { RedisCacheService } from 'src/redis/service/redis/redis.service';

@Injectable()
export class TaskRepository implements ITaskRepositoryInterface{

    constructor(
        @InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>,
        // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, // This is the old way of injecting cache manager To memory
        private readonly redisCacheService: RedisCacheService // This is the new way of injecting cache manager to redis
        ) {}

    async createTask(userId:string ,taskCreateDto: TaskCreateDto): Promise<Tasks> {
        taskCreateDto.UserId = userId;
        const task = new this.taskModel(taskCreateDto);
        if(!task) throw new Error("Task not created");
        return task;
    }

    async getTasks(userId:string): Promise<Tasks[]> {
        const cachedtasks = await this.redisCacheService.get("tasks");
        if(cachedtasks) 
        {
            console.log(cachedtasks);
            return cachedtasks as Tasks[];
        }
        
        const tasks = await this.taskModel.find({UserId:userId, IsDeleted: false});
        await this.redisCacheService.set("tasks", tasks, 100000);
        if(!tasks) throw new Error("Tasks not found");
        
        return tasks;
    }

    async getTaskById(id: string, userId:string): Promise<Tasks> {
        const cachedtask = await this.redisCacheService.get("task");
        if(cachedtask) 
        {
            console.log(cachedtask);
            return cachedtask;
        }
        const task = await this.taskModel.findOne({_id:id, UserId:userId, IsDeleted:false});
        if(!task) throw new BadRequestException("Can't find task");
        await this.redisCacheService.set("task", task, 100000);
        return task;
    }
    async deleteTask(id: string, userId:string, taskDeleteDto: TaskDeleteDto): Promise<Tasks> {
        const task = await this.taskModel.findOneAndUpdate({_id:id, UserId:userId, IsDeleted:false}, taskDeleteDto, {new: true},);
        
        if(!task) throw new BadRequestException("Task Can't be Deleted Cause It's Already Deleted");
        return task;
    }
    async updateTask(id: string, userId:string, taskUpdateDto:TaskUpdateDto): Promise<any> {
        const task = await this.taskModel.findOneAndUpdate({_id:id, UserId:userId, IsDone:false}, taskUpdateDto, {new: true});
        if(!task) throw new BadRequestException("Task Can't be Updated Cause It's Already Done");
        return task;
    }

    private 
}
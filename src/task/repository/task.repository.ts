import { Injectable, BadRequestException, CACHE_MANAGER, Inject } from '@nestjs/common';
import { ITaskRepositoryInterface } from "../interface/Itaskrepository.interface";
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from '../Dtos/task.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tasks } from '../../Model/TaskModel';
import { Cache } from 'cache-manager';

@Injectable()
export class TaskRepository implements ITaskRepositoryInterface{

    constructor(
        @InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
        ) {}

    async createTask(userId:string ,taskCreateDto: TaskCreateDto): Promise<Tasks> {
        taskCreateDto.UserId = userId;
        const task = new this.taskModel(taskCreateDto);
        if(!task) throw new Error("Task not created");
        return task;
    }

    async getTasks(userId:string): Promise<Tasks[]> {
        // // if(cachedtasks) 
        // // {
        // //     return cachedtasks;
        // // }
        // await this.cacheManager.set("tasks", tasks);
        // const cachedtasks = await this.cacheManager.get("tasks");
        // console.log(cachedtasks);
        
        const tasks = await this.taskModel.find({UserId:userId, IsDeleted: false});
        if(!tasks) throw new Error("Tasks not found");
        
        return tasks;
    }

    async getTaskById(id: string, userId:string): Promise<Tasks> {
        const task = await this.taskModel.findOne({id, userId, isDeleted: false});
        if(!task) throw new BadRequestException("Can't find task");
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
}
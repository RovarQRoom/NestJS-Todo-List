import { Injectable } from "@nestjs/common";
import { ITaskRepositoryInterface } from "../interface/Itaskrepository.interface";
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from '../Dtos/task.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tasks } from '../../Model/TaskModel';
import { ObjectId } from 'bson';

@Injectable()
export class TaskRepository implements ITaskRepositoryInterface{

    constructor(@InjectModel(Tasks.name) private readonly usersModel: Model<Tasks>) {}

    async createTask(userId:string ,taskCreateDto: TaskCreateDto): Promise<Tasks> {
        taskCreateDto.UserId = userId;
        const task = new this.usersModel(taskCreateDto);
        if(!task) throw new Error("Task not created");
        return task;
    }

    async getTasks(userId:string): Promise<Tasks[]> {
        const tasks = await this.usersModel.find({UserId:userId, IsDeleted: false});
        if(!tasks) throw new Error("Tasks not found");
        
        return tasks;
    }

    async getTaskById(id: string, userId:string): Promise<Tasks> {
        const task = await this.usersModel.findOne({id, userId, isDeleted: false});
        if(!task) throw new Error("Task not found By Id");
        return task;
    }
    async deleteTask(id: string, userId:string, taskDeleteDto: TaskDeleteDto): Promise<Tasks> {
        const task = await this.usersModel.findOneAndUpdate({_id:id, UserId:userId}, taskDeleteDto, {new: true});
        if(!task) throw new Error("Task Was Not Deleted By Id");
        return task;
    }
    async updateTask(id: string, userId:string, taskUpdateDto:TaskUpdateDto): Promise<any> {
        const task = await this.usersModel.findOneAndUpdate({_id:id, UserId:userId, IsDone:false}, taskUpdateDto, {new: true});
        if(!task) throw new Error("Task Was Not Updated By Id");
        return task;
    }

}
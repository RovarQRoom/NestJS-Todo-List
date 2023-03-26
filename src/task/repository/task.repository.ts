import { Injectable } from "@nestjs/common";
import { ITaskRepositoryInterface } from "../interface/Itaskrepository.interface";

@Injectable()
export class TaskRepository implements ITaskRepositoryInterface{
    createTask(createTaskDto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getTasks(user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getTaskById(id: string, user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteTask(id: string, user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateTask(id: string, status: any, user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

}
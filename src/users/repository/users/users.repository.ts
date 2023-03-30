import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/Model/UsersModel";
import { CreateUserDto} from '../../Dtos/Users.Dtos';
import { ObjectId } from 'bson';
import * as bcrypt from 'bcrypt';
import { IUsersRepository } from "src/users/interface/users/Iusers-repository.interface";

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(@InjectModel(Users.name) private readonly usersModel: Model<Users>) {
        
    }

    // Create User
    async createUser(usersDto: CreateUserDto): Promise<Users> {
       
        usersDto.Password = await this.hashPassword(usersDto.Password,10);
        return new this.usersModel(usersDto);
    }
    // End Create User

    // Get All Users
    async getUsers(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }
    // End Get All Users

    // Get User By Id
    async getUserById(id: string): Promise<Users> {
        if(ObjectId.isValid(id)){
            console.log("Id Is Valid");
        }else{
            throw new BadRequestException("Id Is Not Valid");
        }
        
        return await this.usersModel.findById(id).exec();
    }
    // End Get User By Id

    // Delete User By Id
    async DeleteUser(id: string): Promise<Boolean> {
       if(ObjectId.isValid(id)){
            console.log("Id Is Valid");
        }else{
            throw new BadRequestException("Id Is Not Valid");
        }
        

        if(await this.usersModel.findByIdAndDelete(id).exec()){
            return true;
        }else{
            return false; 
        }
    }
    // End Delete User By Id

    // Update User By Id
    async UpdateUser(id: string, usersDto: any): Promise<Users> {
        if(ObjectId.isValid(id)){
            console.log("Id Is Valid");
        }else{
            throw new BadRequestException("Id Is Not Valid");
        }
        
        usersDto.Password = await this.hashPassword(usersDto.Password,10);

        const user = await this.usersModel.findByIdAndUpdate(
            id,
            usersDto,
            {new: true}
            );
        return user;
    }
    // End Update User By Id

     // Find User By Email And Password
     async findOne(email:string): Promise<Users> {
        const user = await this.usersModel.findOne({Email: email}).exec();
        if(!user){
            return null;
        }
        return user;
    }

    // End Find User By Email And Password

    private async hashPassword(password: string, salt: number): Promise<string> {
        return bcrypt.hash(password, salt);
    } 
}
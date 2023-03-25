import { BadRequestException, Injectable } from '@nestjs/common';
import { IUsers } from '../../interface/users/Iusers.interface';
import { Users } from 'src/Model/UsersModel';
import { CreateUserDto } from '../../Dtos/Users.Dtos';
import { validate } from 'class-validator';
import { UsersRepository } from '../../repository/users/users.repository';

@Injectable()
export class UsersService implements IUsers {
    constructor(private usersRepository: UsersRepository) {}// private readonly usersModel: Model<Users>
    
    // Create User
    async createUser(usersDto: CreateUserDto): Promise<Users> {
        const createdUser = await this.usersRepository.createUser(usersDto);
        const errors = await validate(createdUser);

        const user = await this.findOne(usersDto.Email);
         if(user){
            throw new BadRequestException("User Already Exist With This Email");
        }
        
        if(errors.length > 0){
            throw new BadRequestException(errors);
        } 

        console.log(createdUser);
        return createdUser.save();
    }
    // End Create User

    // Get All Users
    async getUsers() {
        return this.usersRepository.getUsers();
    }
    // End Get All Users

    // Get User By Id
    async getUserById(id: string): Promise<Users> {
        const user = await this.usersRepository.getUserById(id);
        
        if(!user){
            throw new BadRequestException("User not found");
        }

        return user;
    }
    // End Get User By Id

    // Delete User By Id
    async DeleteUser(id: string): Promise<string> {
        
        if(await this.usersRepository.DeleteUser(id)){

            return `User Deleted With This Id: ${id}`;

        }else{

            throw new BadRequestException("User not found");

        }
        
    }
    // End Delete User By Id

    // Update User By Id
    async UpdateUser(id: string, usersDto: CreateUserDto): Promise<Users> {
        const user = await this.usersRepository.UpdateUser(id, usersDto);

        if(!user){
            throw new BadRequestException("User not found");
        }

        return user;
    }
    // End Update User By Id

    async findOne(email:string): Promise<Users> {
        const user = await this.usersRepository.findOne(email);
        return user;
    }

    // Update Refresh Token Hash of Users
    async updatedRtHash(id: string, hashedRt: string) {
        return await this.usersRepository.updatedRtHash(id, hashedRt);
    }
    // End Update Refresh Token Hash of Users

    
}

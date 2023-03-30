import { BadRequestException, Injectable } from '@nestjs/common';
import { IUsers } from '../../interface/users/Iusers.interface';
import { CreateUserDto, GetUsersDto } from '../../Dtos/Users.Dtos';
import { validate } from 'class-validator';
import { UsersRepository } from '../../repository/users/users.repository';

@Injectable()
export class UsersService implements IUsers {
    constructor(private usersRepository: UsersRepository) {}// private readonly usersModel: Model<Users>
    
    // Create User
    async createUser(usersDto: CreateUserDto): Promise<CreateUserDto> {
        const createdUser = await this.usersRepository.createUser(usersDto);
        const errors = await validate(createdUser);

        const user = await this.usersRepository.findOne(usersDto.Email);
         if(user){
            throw new BadRequestException("User Already Exist With This Email");
        }
        
        if(errors.length > 0){
            throw new BadRequestException(errors);
        } 
        createdUser.save();

        const sendUser = new CreateUserDto();
        sendUser.Email = createdUser.Email;
        sendUser.FirstName = createdUser.FirstName;
        sendUser.LastName = createdUser.LastName;
        sendUser.Phone = createdUser.Phone;
        sendUser.Password = createdUser.Password;

        return sendUser;
    }
    // End Create User

    // Get All Users
    async getUsers(): Promise<GetUsersDto[]> {
        const Users = await this.usersRepository.getUsers();

        const getReadUsers = new Array<GetUsersDto>();
        Users.forEach(user => {
            const getUser = new GetUsersDto();
            getUser.Email = user.Email;
            getUser.FirstName = user.FirstName;
            getUser.LastName = user.LastName;
            getUser.Phone = user.Phone;
            getReadUsers.push(getUser);
        });

        return Users;
    }
    // End Get All Users

    // Get User By Id
    async getUserById(id: string): Promise<GetUsersDto> {
        const user = await this.usersRepository.getUserById(id);
        
        if(!user){
            throw new BadRequestException("User not found");
        }

        const getUser = new GetUsersDto();
        getUser.Email = user.Email,
        getUser.FirstName = user.FirstName,
        getUser.LastName = user.LastName,
        getUser.Phone = user.Phone

        return getUser;
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
    async UpdateUser(id: string, usersDto: CreateUserDto): Promise<GetUsersDto> {
        const user = await this.usersRepository.UpdateUser(id, usersDto);

        if(!user){
            throw new BadRequestException("User not found");
        }
        const getUser = new GetUsersDto();
        getUser.Email = user.Email,
        getUser.FirstName = user.FirstName,
        getUser.LastName = user.LastName,
        getUser.Phone = user.Phone

        return getUser;
    }

}

import { CreateUserDto, GetUsersDto } from '../../Dtos/Users.Dtos';
export interface IUsers {
    createUser(usersDto: CreateUserDto): Promise<CreateUserDto>;
    getUsers(): Promise<GetUsersDto[]>;
    getUserById(id: string): Promise<GetUsersDto>;
    DeleteUser(id: string): Promise<string>;
    UpdateUser(id: string, usersDto: CreateUserDto): Promise<GetUsersDto>;
}

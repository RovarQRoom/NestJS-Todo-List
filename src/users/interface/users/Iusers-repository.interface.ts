import { CreateUserDto } from '../../Dtos/Users.Dtos';
import { Users } from '../../../Model/UsersModel';

export interface IUsersRepository {
    createUser(usersDto: CreateUserDto): Promise<Users>;
    getUsers(): Promise<Users[]>;
    getUserById(id: string): Promise<Users>;
    DeleteUser(id: string): Promise<Boolean>;
    UpdateUser(id: string, usersDto: CreateUserDto): Promise<Users>;
}

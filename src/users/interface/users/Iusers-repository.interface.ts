export interface IUsersRepository {
    createUser(usersDto: any): Promise<any>;
    getUsers(): Promise<any>;
    getUserById(id: string): Promise<any>;
    DeleteUser(id: string): Promise<any>;
    UpdateUser(id: string, usersDto: any): Promise<any>;
}

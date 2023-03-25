import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from '../../Dtos/Users.Dtos';
import { UsersService } from '../../service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    async getUsers() {
        const users = await this.userService.getUsers();
        return users;
    }

    @Post("create")
    @UsePipes(new ValidationPipe())
    async createUsers(@Body() usersDto : CreateUserDto) {
        const createdUser = await this.userService.createUser(usersDto);
        return createdUser;
    }

    @Get(':id')
    async getUserById(@Param('id') id:string) {
        const user = await this.userService.getUserById(id);
        return user;
    }

    @Delete('delete/:id')
    async DeleteUser(@Param('id') id:string) {
        const Deleteduser = await this.userService.DeleteUser(id);
        return Deleteduser;
    }

    @Patch('update/:id')
    async UpdateUser(@Param('id') id:string, @Body() usersDto : CreateUserDto) {
        const updatedUser = await this.userService.UpdateUser(id, usersDto);
        return updatedUser;
    }



    @Get('email/:email')
    async getUserByEmail(@Param("email") email:string) {
        const users = await this.userService.findOne(email);
        return users;
    }

}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from '../../Dtos/Users.Dtos';
import { UsersService } from '../../service/users/users.service';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async getUsers() {
        const users = await this.userService.getUsers();
        return users;
    }

    @Post("create")
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    async createUsers(@Body() usersDto : CreateUserDto) {
        const createdUser = await this.userService.createUser(usersDto);
        return createdUser;
    }

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async getUserById(@Param('id') id:string) {
        const user = await this.userService.getUserById(id);
        return user;
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async DeleteUser(@Param('id') id:string) {
        const Deleteduser = await this.userService.DeleteUser(id);
        return Deleteduser;
    }

    @Patch('update/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    async UpdateUser(@Param('id') id:string, @Body() usersDto : CreateUserDto) {
        const updatedUser = await this.userService.UpdateUser(id, usersDto);
        return updatedUser;
    }

}

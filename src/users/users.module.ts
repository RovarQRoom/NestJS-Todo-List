import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users ,UsersSchema } from '../Model/UsersModel';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './service/users/users.service';
import { UsersRepository } from './repository/users/users.repository';
import { AuthService } from '../auth/service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from '../auth/repository/auth.repository';

@Module({
    imports: [
        JwtModule.register({}),
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}])
    ],
    controllers: [UsersController], // provide UsersController To Use It In This Module
    providers: [UsersService,UsersRepository,AuthService,AuthRepository], // provide UsersService To Use It In This Module
    exports: [UsersService] // Export UsersService To Use It In Other Modules
})
export class UsersModule {}

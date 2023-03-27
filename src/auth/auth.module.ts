import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './controller/auth/auth.controller';
import { AccessTokenStrategy } from './strategies/AccessToken.strategy';
import { RefreashTokenStrategy } from './strategies/RefreashToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/Model/UsersModel';
import { GoogleStrategy } from './strategies/Google.strategy';

@Module({
    imports: [
        UsersModule, 
        PassportModule, 
        JwtModule.register({}),
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}])
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        LocalStrategy, 
        RefreashTokenStrategy, 
        AccessTokenStrategy,
        AuthRepository,
        GoogleStrategy
    ],
})
export class AuthModule {}

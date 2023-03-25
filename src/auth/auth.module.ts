import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './controller/auth/auth.controller';
import { AccessTokenStrategy } from './strategies/AccessToken.strategy';
import { RefreashTokenStrategy } from './strategies/RefreashToken.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, RefreashTokenStrategy, AccessTokenStrategy],
})
export class AuthModule {}

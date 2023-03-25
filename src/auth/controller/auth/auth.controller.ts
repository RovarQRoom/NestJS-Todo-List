import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SigninAuthDto } from 'src/auth/Dtos/auth.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { Tokens } from 'src/auth/types/tokens.type';
import { SignUpAuthDto } from '../../Dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() signinAuthDto: SigninAuthDto): Promise<Tokens> {
        return await this.authService.signIn(signinAuthDto);
    }

    @Post('signup')
    async register(@Body() signUpAuthDto: SignUpAuthDto): Promise<Tokens> {
        return await this.authService.signUp(signUpAuthDto);
    }

}

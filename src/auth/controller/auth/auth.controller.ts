import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { SigninAuthDto } from 'src/auth/Dtos/auth.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { Tokens } from 'src/auth/types/tokens.type';
import { SignUpAuthDto } from '../../Dtos/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() signinAuthDto: SigninAuthDto): Promise<Tokens> {
        return await this.authService.signIn(signinAuthDto);
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() signUpAuthDto: SignUpAuthDto): Promise<Tokens> {
        return await this.authService.signUp(signUpAuthDto);
    }

    @UseGuards(AuthGuard('access-token'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Request() req) {
        const user = req.user;
        return await this.authService.logOut(user['sub']);
    }

    @UseGuards(AuthGuard('refreash-token'))
    @Post('refreash')
    @HttpCode(HttpStatus.OK)
    async refreashTokens(@Request() req) {
        const user = req.user;
        return await this.authService.refreashTokens(user['sub'], user['refreashtoken']);
    }

}

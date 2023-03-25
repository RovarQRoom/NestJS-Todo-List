import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { SigninAuthDto } from 'src/auth/Dtos/auth.dto';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { Tokens } from 'src/auth/types/tokens.type';
import { SignUpAuthDto } from '../../Dtos/auth.dto';
import { AccessTokenGuard } from '../../../common/guards/accessToken.guard';
import { RefreashTokenGuard } from '../../../common/guards/refreashToken.guard';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from '../../../common/decorators/get-current-user-id.decorator';

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

    @UseGuards(AccessTokenGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: string) {
        return await this.authService.logOut(userId);
    }

    @UseGuards(RefreashTokenGuard)
    @Post('refreash')
    @HttpCode(HttpStatus.OK)
    async refreashTokens(@GetCurrentUser('refreashtoken') refreashtoken: string, @GetCurrentUserId() userId: string) {
        return await this.authService.refreashTokens(userId, refreashtoken);
    }

}

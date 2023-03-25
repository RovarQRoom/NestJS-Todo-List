import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../../users/service/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../../types/tokens.type';
import { SigninAuthDto, SignUpAuthDto } from '../../Dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ){}

    // async validateUser(email: string, pass: string): Promise<any> {
    //     const user = await this.usersService.findOne(email);

    //     if(user && await this.validatePassword(pass, user.Password)){
    //         const { Password, ...result } = user;
    //         return result;
    //     }

    //     return null;
    // }

    async signIn(signinAuthDto: SigninAuthDto): Promise<Tokens> {
        const user = await this.usersService.findOne(signinAuthDto.Email);

        if(user && await this.validatePassword(signinAuthDto.Password, user.Password)){
            const tokens = await this.getTokens(user._id, user.Email);
            await this.usersService.updatedRtHash(user._id, tokens.refresh_token);
            return tokens;
        }
        throw new UnauthorizedException("User not found");
        
    }

    async signUp(signUpAuthDto:SignUpAuthDto): Promise<Tokens> {
        const user = await this.usersService.createUser(signUpAuthDto);

        const tokens = await this.getTokens(user._id, user.Email);
        await this.usersService.updatedRtHash(user._id, tokens.refresh_token);
        return tokens;
    }

    // Bcrypt Password Comparing
    async validatePassword(plainTextPassword: string,hashedPassword: string,): Promise<boolean> {
        const isPasswordMatched = await compare(plainTextPassword, hashedPassword);
        if(!isPasswordMatched){
            throw new UnauthorizedException("Password is not matched");
        }
    
        return isPasswordMatched;
      }
    // End Bcrypt Password Comparing

    // Creating Tokens For User
    async getTokens(userId:string, email:string): Promise<Tokens>{

        const [accessToken,refreshToken] = await Promise.all(
            [
                this.jwtService.signAsync({sub:userId, email},{
                    secret:"rovarkamilothmanaziz",
                    expiresIn: 60 * 60,
                }),
                this.jwtService.signAsync({sub:userId, email},{
                    secret:"hevarkamilothmanaziz",
                    expiresIn: 60 * 60 * 24 * 7,
                }),
            ]
        ) 

        return {access_token: accessToken, refresh_token: refreshToken};
    }
    // End Creating Tokens For User

}

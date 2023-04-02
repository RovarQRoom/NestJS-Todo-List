import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../../types/tokens.type';
import { SigninAuthDto, SignUpAuthDto } from '../../Dtos/auth.dto';
import { IAuthInterface } from 'src/auth/interface/Iauth.interface';
import { AuthRepository } from '../../repository/auth.repository';
import { validate } from 'class-validator';

@Injectable()
export class AuthService implements IAuthInterface {
    constructor(
        private readonly AuthRepository: AuthRepository,
        private readonly jwtService: JwtService
        ){}

    // Sign In User And Authentication
    async signIn(signinAuthDto: SigninAuthDto): Promise<Tokens> {
        const user = await this.AuthRepository.findUserByEmail(signinAuthDto.Email);
        

        if(user && await this.validatePassword(signinAuthDto.Password, user.Password)){
            const tokens = await this.getTokens(user._id, user.Email);
            await this.AuthRepository.updatedRtHash(user._id, tokens.refresh_token);
            return tokens;
        }
        throw new UnauthorizedException("User not found");
    }
    // End Sign In User And Authentication

    async googleLogin(req) {
        if (!req.user) {
            return 'No user from Google';
        }
        const userDb = await this.AuthRepository.findUserByEmail(req.user.email);
        if(userDb){
            const tokens = await this.getTokens(userDb._id, userDb.Email);
            await this.AuthRepository.updatedRtHash(userDb._id, tokens.refresh_token);
            return tokens;
        }else{

            await this.AuthRepository.createGoogleUser(req.user);
            const userDbCreated = await this.AuthRepository.findUserByEmail(req.user.email);
            const tokens = await this.getTokens(userDbCreated.id, req.user.email);
            await this.AuthRepository.updatedRtHash(req.user._id, tokens.refresh_token);
            return tokens;
        }
    }

    // Sign Up User And Authentication
    async signUp(signUpAuthDto:SignUpAuthDto): Promise<Tokens> {
        const createdUser = await this.AuthRepository.signUp(signUpAuthDto);

        const errors = await validate(createdUser);

        const user = await this.AuthRepository.findUserByEmail(signUpAuthDto.Email);
         if(user){
            throw new BadRequestException("User Already Exist With This Email");
        }
        
        if(errors.length > 0){
            throw new BadRequestException(errors);
        } 

        console.log(createdUser);
        createdUser.save();

        const tokens = await this.getTokens(createdUser._id, createdUser.Email);
        await this.AuthRepository.updatedRtHash(createdUser._id, tokens.refresh_token);
        return tokens;
    }
    // End Sign Up User And Authentication

    // Log Out User
    async logOut(userId:string) {
        return await this.AuthRepository.logOut(userId);
    }
    // End Log Out User


    // Refreash Tokens
    async refreashTokens(userId:string, refreashToken:string){
        const user = await this.AuthRepository.refreashTokens(userId);

        const isTokenMatched = await compare(refreashToken, user.hashedRt);
        if(!isTokenMatched){
            throw new UnauthorizedException("Token is not matched");
        }

        const tokens = await this.getTokens(user._id, user.Email);
        await this.AuthRepository.updatedRtHash(user._id, tokens.refresh_token);
        return tokens;
    }
    // End Refreash Tokens

    // Bcrypt Password Comparing
    async validatePassword(plainTextPassword: string,hashedPassword: string): Promise<boolean> {
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

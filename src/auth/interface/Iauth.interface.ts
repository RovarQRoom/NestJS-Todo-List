import { SigninAuthDto, SignUpAuthDto } from '../Dtos/auth.dto';
import { Tokens } from '../types/tokens.type';

export interface IAuthInterface {
    signIn(signinAuthDto: SigninAuthDto): Promise<Tokens>;
    signUp(signUpAuthDto: SignUpAuthDto): Promise<Tokens>;
    validatePassword(plainTextPassword: string,hashedPassword: string): Promise<boolean>;
    getTokens(userId:string, email:string): Promise<Tokens>;
}
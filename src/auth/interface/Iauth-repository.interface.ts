import { SigninAuthDto, SignUpAuthDto } from '../Dtos/auth.dto';
import { Users } from '../../Model/UsersModel';

export interface IAuthRepositoryInterface {
    signIn(signinAuthDto: SigninAuthDto): Promise<Users>;
    signUp(signUpAuthDto: SignUpAuthDto): Promise<Users>;
}
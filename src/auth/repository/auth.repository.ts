import { Injectable } from "@nestjs/common";
import { IAuthRepositoryInterface } from "../interface/Iauth-repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "src/Model/UsersModel";
import { Model } from "mongoose";
import { SignUpAuthDto, SigninAuthDto } from '../Dtos/auth.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthRepository implements IAuthRepositoryInterface {

    constructor(@InjectModel(Users.name) private readonly usersModel: Model<Users>) {}

    async signIn(signinAuthDto: SigninAuthDto): Promise<any> {
        const user = await this.usersModel.findOne({Email: signinAuthDto.Email}).exec();
        if(!user){
            return null;
        }
        return user;
    }

    async signUp(signUpAuthDto: SignUpAuthDto): Promise<Users> {
        signUpAuthDto.Password = await this.hashPassword(signUpAuthDto.Password,10);
        return new this.usersModel(signUpAuthDto);
    }


    private async hashPassword(password: string, salt: number): Promise<string> {
        return bcrypt.hash(password, salt);
    } 

     // Find User By Email And Password
     async findUserByEmail(email:string): Promise<Users> {
        const user = await this.usersModel.findOne({Email: email}).exec();
        if(!user){
            return null;
        }
        return user;
    }

    async updatedRtHash(id: string, hashedRt: string) {
        const hash = await this.hashPassword(hashedRt,10);
        await this.usersModel.findByIdAndUpdate(id,{hashedRt: hash},{new: true}).exec();
    }

}
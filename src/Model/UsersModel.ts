import { Global } from '@nestjs/common';
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Global()
@Schema()
export class Users extends Document {
    @Prop({type:String})
    FirstName: string;
    
    @Prop({type:String})
    LastName: string;
    
    @Prop({type:String ,unique: true})
    Email: string;

    @Prop({type:String})
    Phone:string;

    @Prop({type:String})
    Password:string;

    @Prop({type:String})
    hashedRt: string;

    @Prop({type:String , nullable: true, default: null, unique: true})
    googleId: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
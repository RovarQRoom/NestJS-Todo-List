import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Date, Document, SchemaTypes} from 'mongoose';

@Schema()
export class Tasks extends Document {
    @Prop({type:String})
    Title: string;
    
    @Prop({type:String , nullable: true})
    Description: string;
    
    @Prop({type: Date, nullable: true})
    DueTime: Date;

    @Prop({type: Boolean, default: false})
    IsDone:boolean;

    @Prop({type: Date, nullable: true})
    DoneDate:Date;
    
    @Prop({type: Boolean, default: false})
    IsDeleted:boolean;
    
    @Prop({type: Date, nullable: true})
    DeletedAt:Date;
    
    @Prop({type: SchemaTypes.ObjectId , ref: 'Users'})
    UserId:string;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from 'src/Model/TaskModel';
import { TaskController } from './controller/task/task.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Tasks.name, schema: TasksSchema}])
    ],
    controllers: [TaskController],
})
export class TaskModule {}

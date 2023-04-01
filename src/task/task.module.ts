import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from 'src/Model/TaskModel';
import { TaskController } from './controller/task/task.controller';
import { TaskService } from './service/task/task.service';
import { TaskRepository } from './repository/task.repository';
import { RedisModule } from '../redis/redis.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Tasks.name, schema: TasksSchema}]),
        RedisModule,
        RabbitMQModule
    ],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
})
export class TaskModule {}

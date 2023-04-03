import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from 'src/Model/TaskModel';
import { TaskController } from './controller/task/task.controller';
import { TaskService } from './service/task/task.service';
import { TaskRepository } from './repository/task.repository';
import { RedisModule } from '../redis/redis.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { AccessTokenStrategy } from 'src/strategies/AccessToken.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Tasks.name, schema: TasksSchema}]),
        RedisModule,
        JwtModule,
        RabbitMQModule,
    ],
    controllers: [TaskController],
    providers: [
                TaskService, 
                TaskRepository,
                AccessTokenStrategy
            ],
})
export class TaskModule {}

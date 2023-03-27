import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from 'src/Model/TaskModel';
import { TaskController } from './controller/task/task.controller';
import { TaskService } from './service/task/task.service';
import { TaskRepository } from './repository/task.repository';
import { redisModule } from 'src/modules.config';

@Module({
    imports: [
        redisModule,
        MongooseModule.forFeature([{name: Tasks.name, schema: TasksSchema}]),
        CacheModule.register({
            ttl: 60, // seconds
            max: 1000, // maximum number of items in cache
          }),
    ],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
})
export class TaskModule {}

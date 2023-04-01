import { CacheInterceptor, CacheModule, Module, UseInterceptors } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { TaskModule } from './task/task.module';
import { RedisModule } from './redis/redis.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@UseInterceptors(CacheInterceptor)
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Rovar2000:900mylife@typescripttraning.ld9ug60.mongodb.net/?retryWrites=true&w=majority"),
    UsersModule,
    AuthModule,
    TaskModule,
    CacheModule.register({
      ttl: 100000, // seconds
      max: 1000, // maximum number of items in cache
    }),
    ClientsModule.register([
      {
        name: 'RabbitMQService',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'task_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    RedisModule,
  ],
  controllers: [],
  providers: [{
    provide: 'APP_GUARD',
    useClass: AccessTokenGuard,
  },],
})
export class AppModule {}

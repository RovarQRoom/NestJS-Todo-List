import { CacheInterceptor, CacheModule, Module, UseInterceptors } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { TaskModule } from './task/task.module';
import { RedisModule } from './redis/redis.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { JwtModule } from '@nestjs/jwt';

@UseInterceptors(CacheInterceptor)
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Rovar2000:900mylife@typescripttraning.ld9ug60.mongodb.net/?retryWrites=true&w=majority"),
    TaskModule,
    CacheModule.register({
      ttl: 100000, // seconds
      max: 1000, // maximum number of items in cache
    }),
    RedisModule,
    RabbitMQModule,
  ],
  controllers: [],
  providers: [
    {
    provide: 'APP_GUARD',
    useClass: AccessTokenGuard,
  },
],
})
export class AppModule {}

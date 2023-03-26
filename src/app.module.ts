import { CacheInterceptor, CacheModule, Module, UseInterceptors } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { TaskModule } from './task/task.module';

@UseInterceptors(CacheInterceptor)
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Rovar2000:900mylife@typescripttraning.ld9ug60.mongodb.net/?retryWrites=true&w=majority"),
    UsersModule,
    AuthModule,
    TaskModule,
    CacheModule.register({
      ttl: 60, // seconds
      max: 1000, // maximum number of items in cache
    }),
  ],
  controllers: [],
  providers: [{
    provide: 'APP_GUARD',
    useClass: AccessTokenGuard,
  }],
})
export class AppModule {}

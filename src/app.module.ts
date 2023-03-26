import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Rovar2000:900mylife@typescripttraning.ld9ug60.mongodb.net/?retryWrites=true&w=majority"),
    UsersModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [{
    provide: 'APP_GUARD',
    useClass: AccessTokenGuard,
  }],
})
export class AppModule {}

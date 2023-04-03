import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672', 'amqp://localhost:5673', 'amqp://localhost:15672'],
      queue: 'tasks_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

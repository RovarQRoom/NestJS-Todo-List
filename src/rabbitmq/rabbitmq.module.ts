import { Module, Inject, OnModuleInit, Logger } from "@nestjs/common";
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { RabbitmqService } from './service/rabbitmq/rabbitmq.service';

//Using Redis As Cache
@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'RabbitMQService',
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://localhost:5672', 'amqp://localhost:5673', 'amqp://localhost:15672'],
                queue: 'tasks_queue',
                queueOptions: {
                  durable: false
                },
              },
            },
          ]),
    ],
    providers: [RabbitmqService],
    exports: [RabbitMQModule,RabbitmqService],
})
export class RabbitMQModule implements OnModuleInit {
    constructor(@Inject('RabbitMQService') private readonly rabbitMqService: ClientProxy) {}
    
  onModuleInit() {
    const logger = new Logger('RabbitMQ Microservice is Connected');
  }
}
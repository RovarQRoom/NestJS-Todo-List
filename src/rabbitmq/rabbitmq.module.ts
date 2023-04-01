import { Module, Inject } from "@nestjs/common";
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
                urls: ['amqp://localhost:5672'],
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
export class RabbitMQModule {
    constructor(@Inject('RabbitMQService') private readonly rabbitMqService: ClientProxy) {}
}
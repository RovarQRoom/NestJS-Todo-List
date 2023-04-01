import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
    constructor(@Inject("RabbitMQService") private readonly rabbitMqService: ClientProxy) {}

    async send(event: string, data: any) {
        await this.rabbitMqService.send(event, data).toPromise();
    }
}

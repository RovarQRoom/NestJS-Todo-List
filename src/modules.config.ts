import {Logger} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { RedisModule } from "./redis/redis.module";
import { RedisOptions } from "ioredis";

export const redisModule = RedisModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        const logger = new Logger('RedisModule');

        const connectionOptions: RedisOptions = {
            host: configService.get('REDIS_HOST') || 'localhost',
            port: configService.get('REDIS_PORT') || 6379,
        };
        const onClientReady = (client) => {
            logger.log('Redis client is ready');

            client.on('error', (error) => {
                logger.error("Redis Client Error: "+error);
            });

            client.on('connect', () => {
                logger.log(`Connected to Redis: ${connectionOptions.host}:${connectionOptions.port}`);
            });
        };
        return {connectionOptions, onClientReady};
    },
    inject: [ConfigService],
});
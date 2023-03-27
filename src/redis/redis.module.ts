import {CACHE_MANAGER ,CacheModule, Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { Cache } from 'cache-manager';
import { RedisCacheService } from './service/redis/redis.service';

// export const IOREDISKEY = 'IOREDISKEY';

// type RedisModuleOptions = {
//     connectionOptions: RedisOptions,
//     onClientReady?: (client: Redis) => void,
// };

// type RedisAsyncModuleOptions = {
//     useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions,
// } & Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider, 'inject'>;

// @Module({})
// export class RedisModule {
//     static async registerAsync({useFactory, imports, inject}:RedisAsyncModuleOptions): Promise<DynamicModule> {
//         const redisProvider = {
//             provide: IOREDISKEY,
//             useFactory: async (...args: any[]) => {
//                 const {connectionOptions, onClientReady} = await useFactory(...args);
//                 const client = await new IORedis(connectionOptions);
//                 if (onClientReady) {
//                     client.on('ready', () => onClientReady(client));
//                 }
//                 return client;
//             },
//             inject,
//         };
//         return  {
//             module:RedisModule,
//             imports,
//             providers: [redisProvider],
//             exports: [redisProvider],
//         };
//     }
// }

//This Redis is For Microservice Communication


//Using Redis As Cache
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async () => {
                return {
                    store: redisStore,
                    host: 'localhost',
                    port: 6379,
                    ttl: 60*3600*1000, // seconds
                };
            },
        })
    ],
    providers: [RedisCacheService],
    exports: [CacheModule,RedisCacheService],
})
export class RedisModule implements OnModuleInit {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    public onModuleInit(): any {
        const logger = new Logger('Cache');
    }
}

import { DynamicModule, FactoryProvider, Module, ModuleMetadata } from '@nestjs/common';
import IORedis, {Redis, RedisOptions } from 'ioredis';

export const IOREDISKEY = 'IOREDISKEY';

type RedisModuleOptions = {
    connectionOptions: RedisOptions,
    onClientReady?: (client: Redis) => void,
};

type RedisAsyncModuleOptions = {
    useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions,
} & Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider, 'inject'>;

@Module({})
export class RedisModule {
    static async registerAsync({useFactory, imports, inject}:RedisAsyncModuleOptions): Promise<DynamicModule> {
        const redisProvider = {
            provide: IOREDISKEY,
            useFactory: async (...args: any[]) => {
                const {connectionOptions, onClientReady} = await useFactory(...args);
                const client = await new IORedis(connectionOptions);
                if (onClientReady) {
                    client.on('ready', () => onClientReady(client));
                }
                return client;
            }
        };
        return  {
            module:RedisModule,
            imports,
            providers: [],
            exports: [],
        };
    }
}

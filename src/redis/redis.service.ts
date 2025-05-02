import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    });
  }

  onModuleDestroy() {
    this.redisClient.quit();
  }

  async subscribeToUser(userId: string) {
    await this.redisClient.sadd('users', userId);
  }

  async unsubscribeFromUser(userId: string) {
    await this.redisClient.srem('users', userId);
  }

  async isUserSubscribed(userId: string): Promise<boolean> {
    return (await this.redisClient.sismember('users', userId)) === 1;
  }

  async getSubscribedUsers(): Promise<string[]> {
    return await this.redisClient.smembers('users');
  }
} 
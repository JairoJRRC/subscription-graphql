import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

@Module({
  imports: [RedisModule],
  providers: [NotificationResolver, NotificationService],
})
export class NotificationModule {} 
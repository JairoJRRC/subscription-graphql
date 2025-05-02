import { Injectable, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class NotificationService {
  private pubSub: PubSub;
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly redisService: RedisService) {
    this.pubSub = new PubSub();
  }

  async sendNotification(message: string, userId: string) {
    this.logger.log(`Intentando enviar notificación a usuario ${userId}`);
    const isSubscribed = await this.redisService.isUserSubscribed(userId);
    
    if (!isSubscribed) {
      this.logger.warn(`Usuario ${userId} no está suscrito`);
      throw new Error(`User ${userId} is not subscribed to notifications`);
    }

    const notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      userId,
    };

    this.logger.log(`Publicando notificación: ${JSON.stringify(notification)}`);
    await this.pubSub.publish('notificationSent', {
      notificationSent: notification,
    });

    return notification;
  }

  async subscribeUser(userId: string) {
    this.logger.log(`Suscribiendo usuario ${userId}`);
    await this.redisService.subscribeToUser(userId);
  }

  async unsubscribeUser(userId: string) {
    this.logger.log(`Desuscribiendo usuario ${userId}`);
    await this.redisService.unsubscribeFromUser(userId);
  }

  getPubSub() {
    return this.pubSub;
  }
} 
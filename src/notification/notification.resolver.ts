import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './notification.type';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }

  @Mutation(() => Notification)
  async sendNotification(
    @Args('message') message: string,
    @Args('userId') userId: string,
  ) {
    return this.notificationService.sendNotification(message, userId);
  }

  @Mutation(() => Boolean)
  async subscribeToNotifications(@Args('userId') userId: string) {
    await this.notificationService.subscribeUser(userId);
    return true;
  }

  @Mutation(() => Boolean)
  async unsubscribeFromNotifications(@Args('userId') userId: string) {
    await this.notificationService.unsubscribeUser(userId);
    return true;
  }

  @Subscription(() => Notification, {
    filter: (payload, variables) => {
      return payload.notificationSent.userId === variables.userId;
    },
  })
  notificationSent(@Args('userId') userId: string) {
    return this.notificationService.getPubSub().asyncIterator('notificationSent');
  }
} 
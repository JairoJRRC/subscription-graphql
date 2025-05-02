import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
          onConnect: (context) => {
            Logger.log('Cliente conectado:', context.connectionParams);
            return context.connectionParams;
          },
          onDisconnect: () => {
            Logger.log('Cliente desconectado');
          },
        },
      },
      playground: true,
      debug: true,
    }),
    NotificationModule,
  ],
})
export class AppModule {} 
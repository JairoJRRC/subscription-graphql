import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field()
  id: string;

  @Field()
  message: string;

  @Field()
  timestamp: Date;

  @Field()
  userId: string;
} 
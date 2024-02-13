import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Meta {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  lastPage: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  prev: number;

  @Field(() => Int)
  next: number;
}

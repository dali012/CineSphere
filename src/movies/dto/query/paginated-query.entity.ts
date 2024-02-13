import { Field, ObjectType } from '@nestjs/graphql';
import { MovieEntity } from '../../entities/movie.entity';
import { Meta } from './metadata.entity';

@ObjectType()
export class PaginatedResult {
  @Field(() => [MovieEntity])
  data: MovieEntity[];

  @Field()
  meta: Meta;
}

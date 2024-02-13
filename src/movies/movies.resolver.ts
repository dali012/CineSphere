import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { PaginatedResult } from './dto/query/paginated-query.entity';
import { MovieEntity } from './entities/movie.entity';

@Resolver(() => MovieEntity)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => PaginatedResult)
  async findAll(
    @Args({ name: 'page', type: () => Int, nullable: true }) page: number = 1,
    @Args({ name: 'perPage', type: () => Int, nullable: true })
    perPage: number = 20,
  ) {
    return await this.moviesService.findAll(page, perPage);
  }
}

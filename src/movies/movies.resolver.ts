import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { PaginatedResult } from './dto/query/paginated-query.entity';
import { MovieEntity } from './entities/movie.entity';

@Resolver(() => MovieEntity)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * A description of the entire function.
   *
   * @param {number} page - description of parameter
   * @param {number} perPage - description of parameter
   * @return {Promise<PaginatedResult<MovieEntity>>} description of return value
   */
  @Query(() => PaginatedResult)
  async findAll(
    @Args({ name: 'page', type: () => Int, nullable: true }) page: number = 1,
    @Args({ name: 'perPage', type: () => Int, nullable: true })
    perPage: number = 20,
  ) {
    return await this.moviesService.findAll(page, perPage);
  }

  @Query(() => MovieEntity)
  async findOne(@Args('id') id: number) {
    return await this.moviesService.findOne(id);
  }

  @Query(() => PaginatedResult)
  async searchByYear(
    @Args('year') year: number,
    @Args({ name: 'page', type: () => Int, nullable: true }) page: number = 1,
    @Args({ name: 'perPage', type: () => Int, nullable: true })
    perPage: number = 20,
  ) {
    return await this.moviesService.getByYear(year, page, perPage);
  }
}

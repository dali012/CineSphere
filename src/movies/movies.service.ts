import { PrismaService } from '../lib/prisma';
import { Injectable } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Finds all items based on pagination parameters.
   *
   * @param {number} page - the page number
   * @param {number} perPage - the number of items per page
   * @return {Promise<PaginatedResult<MovieEntity>>} a promise that resolves to an array of MovieEntity objects
   */
  async findAll(page: number, perPage: number) {
    const paginate = createPaginator({ page, perPage });
    return await paginate<MovieEntity, Prisma.MovieFindManyArgs>(
      this.prisma.movie,
      {
        include: {
          torrents: true,
        },
        orderBy: {
          year: 'desc',
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  /**
   * Find a movie by its unique identifier.
   *
   * @param {number} id - The unique identifier of the movie.
   * @return {Promise<Movie>} The movie found by the unique identifier.
   */
  async findOne(id: number) {
    try {
      const movie = await this.prisma.movie.findUnique({
        where: {
          id,
        },
        include: {
          torrents: true,
        },
      });
      return movie;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Retrieves movies from a specific year with pagination.
   *
   * @param {number} year - the year of the movies to retrieve
   * @param {number} page - the page number for pagination
   * @param {number} perPage - the number of items per page for pagination
   * @return {Promise<Promise<PaginatedResult<MovieEntity>>>} a promise that resolves to an array of MovieEntity objects
   */
  async getByYear(year: number, page: number, perPage: number) {
    const paginate = createPaginator({ page, perPage });
    return await paginate<MovieEntity, Prisma.MovieFindManyArgs>(
      this.prisma.movie,
      {
        where: {
          year,
        },
        include: {
          torrents: true,
        },
      },
      {
        page,
        perPage,
      },
    );
  }
}

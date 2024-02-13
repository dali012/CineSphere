import { PrismaService } from '@/lib/prisma';
import { Injectable } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}
  async findAll(page: number, perPage: number) {
    const paginate = createPaginator({ page, perPage });
    return await paginate<MovieEntity, Prisma.MovieFindManyArgs>(
      this.prisma.movie,
      {
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

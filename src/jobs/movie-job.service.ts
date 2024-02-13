import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { YtsMovie, YtsResponse } from './types';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaErrorCode } from './err/prisma-error.code';
import { PrismaService } from '@/lib/prisma';
import { AllConfigType } from '@/config/config.type';
import { convertToMovieData } from '@/utils/convert-movie';

@Injectable()
export class MovieJobService {
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {ConfigService<AllConfigType>} configService - the configuration service
   * @param {HttpService} httpService - the HTTP service
   * @param {PrismaService} prisma - the Prisma service
   */
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(MovieJobService.name);

  /**
   * Get the last page scraped from the database.
   *
   * @return {Promise<number>} The last scraped page number, if available.
   */
  private async getLastPageScraped(): Promise<number> {
    const result = await this.prisma.yTS.findFirst({
      select: {
        last_scraped_page: true,
      },
    });
    return result?.last_scraped_page;
  }

  /**
   * Increment the last scraped page in the database.
   *
   */
  private async incrementLastPageScraped() {
    await this.prisma.yTS.update({
      where: {
        id: 1,
      },
      data: {
        last_scraped_page: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Check if the next page is scrapable.
   *
   * @return {Promise<{page: number}> | false} Returns the next scrapable page number or false.
   */
  private async isNextPageScrapable(): Promise<
    | false
    | {
        page: number;
      }
  > {
    try {
      const last_scraped_page = await this.getLastPageScraped();
      const {
        data: { data },
      } = await this.httpService.axiosRef.get<YtsResponse>(
        this.configService.getOrThrow('movieJob.ytsUrl', {
          infer: true,
        }),
        {
          params: {
            page: last_scraped_page + 1,
          },
        },
      );
      if (data?.movies) {
        return {
          page: last_scraped_page + 1,
        };
      } else {
        return false;
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {void}
   * @return {Promise<YtsMovie[]>}
   */
  private async scrapeMoviePage(): Promise<YtsMovie[]> {
    try {
      const isNextPageScrapable = await this.isNextPageScrapable();
      if (!isNextPageScrapable) return;

      const {
        data: { data },
      } = await this.httpService.axiosRef.get<YtsResponse>(
        this.configService.getOrThrow('movieJob.ytsUrl', {
          infer: true,
        }),
        {
          params: {
            page: isNextPageScrapable.page,
          },
        },
      );
      return data.movies;
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * Save movies to the database.
   *
   * @param {YtsMovie[]} movies - array of YtsMovie objects to be saved
   * @return {Promise<void>} a Promise that resolves when the movies are saved to the database
   */
  private async saveMoviesToDatabase(movies: YtsMovie[]): Promise<void> {
    try {
      const createMoviePromises = movies.map((movie) =>
        this.prisma.movie.create(convertToMovieData(movie)),
      );
      await Promise.all(createMoviePromises);
    } catch (error) {
      if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
        this.logger.error('Movie already exists in the database');
      }
    }
  }

  /**
   * Get the total movie count from the database.
   *
   * @return {Promise<number>} a Promise that resolves with the total movie count
   */
  private async totalMovieCount(): Promise<number> {
    return await this.prisma.movie.count();
  }

  private async getTotalLinks(): Promise<number> {
    return await this.prisma.torrent.count();
  }

  private async logStatus(): Promise<void> {
    const totalMovieCount = await this.totalMovieCount();
    const lastScrapedPage = await this.getLastPageScraped();
    const totalLinks = await this.getTotalLinks();
    this.logger.log(`Total movie count: ${totalMovieCount}`);
    this.logger.log(`Total links: ${totalLinks}`);
    this.logger.log(`Last scraped page: ${lastScrapedPage}`);
  }

  /**
   * Save scraped movies to the database and log the total movie count.
   *
   * @return {Promise<void>} A promise that resolves when the movies are saved and total movie count is logged.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async saveScrapedMovies(): Promise<void> {
    try {
      const movies = await this.scrapeMoviePage();
      this.logger.log('Scraping movies...');
      if (movies) {
        await this.saveMoviesToDatabase(movies);
        await this.logStatus();
        await this.incrementLastPageScraped();
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}

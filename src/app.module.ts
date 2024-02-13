import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieJobModule } from './jobs/movie-job.module';
import { MoviesModule } from './movies/movies.module';
import appConfig from './config/app.config';
import movieJobConfig from './jobs/config/movie-job.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, movieJobConfig],
    }),
    MovieJobModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

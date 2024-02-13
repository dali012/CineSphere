import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
import movieJobConfig from '@/jobs/config/movie-job.config';
import { MovieJobModule } from '@/jobs/movie-job.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, movieJobConfig],
    }),
    MovieJobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

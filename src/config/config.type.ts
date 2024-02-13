import { MovieJobConfigType } from '../jobs/config/movie-job.config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  movieJob: MovieJobConfigType;
};

import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { MovieJobConfigType } from './movie-job.config.type';
import validateConfig from '../../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  YTS_URL: string;

  @IsString()
  CRON: string;
}

export default registerAs<MovieJobConfigType>('movieJob', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    ytsUrl: process.env.YTS_URL,
    cron: process.env.CRON,
  };
});

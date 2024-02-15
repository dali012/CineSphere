import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { AppConfig } from './app-config.type';
import validateConfig from '../utils/validate-config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(1)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  API_PREFIX: string;

  @IsString()
  APP_NAME: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME,
    port: parseInt(process.env.APP_PORT, 10),
    apiPrefix: process.env.API_PREFIX,
  };
});

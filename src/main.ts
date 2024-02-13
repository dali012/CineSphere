import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(
    configService.getOrThrow('app.port', {
      infer: true,
    }),
  );
}
void bootstrap();

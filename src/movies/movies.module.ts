import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PrismaService } from '../lib/prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MoviesResolver } from './movies.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [MoviesResolver, MoviesService, PrismaService],
})
export class MoviesModule {}

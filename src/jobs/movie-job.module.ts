import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MovieJobService } from './movie-job.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from '../lib/prisma';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [PrismaService, MovieJobService],
})
export class MovieJobModule {}

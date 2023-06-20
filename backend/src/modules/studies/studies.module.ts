import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { Study } from '../../entities/study.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Study])],
  providers: [StudiesService],
  controllers: [StudiesController],
})
export class StudiesModule {}

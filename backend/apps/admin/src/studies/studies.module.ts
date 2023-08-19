import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from '@entities/study.entity';
import studiesProviders from './studies.providers';
import { StudyAttribute } from '@entities';
import { StudiesService } from './studies.service';
import { StudyGuard } from './study.guard';
import { StudyAttributesRepository } from './repositories/study-attributes.repository';
import { StudiesRepository } from './repositories/studies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyAttribute])],
  providers: studiesProviders,
  exports: [
    StudyGuard,
    StudiesRepository,
    StudiesService,
    StudyAttributesRepository,
  ],
})
export class StudiesModule {}

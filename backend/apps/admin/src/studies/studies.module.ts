import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from '@entities/study.entity';
import studiesProviders from './studies.providers';
import { StudyAttribute } from '@entities';
import { StudiesService } from './studies.service';
import { StudyGuard } from './guards/study.guard';
import { StudyAttributesRepository } from './repositories/study-attributes.repository';
import { StudiesRepository } from './repositories/studies.repository';
import { IsStudyActiveGuard } from './guards/IsStudyActiveGuard';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyAttribute])],
  providers: studiesProviders,
  exports: [
    StudyGuard,
    StudiesRepository,
    StudiesService,
    StudyAttributesRepository,
    IsStudyActiveGuard,
  ],
})
export class StudiesModule {}

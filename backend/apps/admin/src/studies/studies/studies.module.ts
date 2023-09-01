import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from '@entities';
import studiesProviders from './studies.providers';
import { StudyAttribute } from '@entities';
import { StudiesService } from './studies.service';
import { StudyGuard } from './guards/study.guard';
import { IsStudyActiveGuard } from './guards/IsStudyActiveGuard';
import { IsStudyDeletedGuard } from './guards/IsStudyDeletedGuard';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyAttribute])],
  providers: studiesProviders,
  exports: [
    StudiesService,
    StudyGuard,
    IsStudyActiveGuard,
    IsStudyDeletedGuard,
  ],
})
export class StudiesModule {}

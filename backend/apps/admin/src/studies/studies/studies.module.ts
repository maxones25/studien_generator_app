import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from '@entities/study.entity';
import studiesProviders from './studies.providers';
import { StudyAttribute } from '@entities';
import { StudiesService } from './studies.service';
import { StudyGuard } from './guards/study.guard';
import { IsStudyActiveGuard } from './guards/IsStudyActiveGuard';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyAttribute])],
  providers: studiesProviders,
  exports: [StudiesService, StudyGuard, IsStudyActiveGuard],
})
export class StudiesModule {}

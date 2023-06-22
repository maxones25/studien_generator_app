import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { Study } from '../../entities/study.entity';
import { StudyToDirector } from '../../entities/studyToDirector.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyToDirector])],
  providers: [
    StudiesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [StudiesController],
})
export class StudiesModule {}

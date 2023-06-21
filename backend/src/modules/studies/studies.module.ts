import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { Study } from '../../entities/study.entity';
import { StudyToDirector } from '../../entities/studyToDirector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyToDirector])],
  providers: [StudiesService],
  controllers: [StudiesController],
})
export class StudiesModule {}

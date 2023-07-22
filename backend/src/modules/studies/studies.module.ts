import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { Study } from '../../entities/study.entity';
import { StudyMembersModule } from './members/study-members.module';
import { StudiesRepository } from './studies.repository';
import { EntityManager } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Study]), StudyMembersModule],
  providers: [
    StudiesService,
    {
      provide: StudiesRepository,
      useFactory: (entityManager: EntityManager) =>
        new StudiesRepository(Study, entityManager),
      inject: [EntityManager],
    },
  ],
  controllers: [StudiesController],
})
export class StudiesModule {}

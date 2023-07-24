import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesController } from './studies.controller';
import { Study } from '@entities/study.entity';
import { StudyMembersModule } from './members/study-members.module';
import studiesProviders from './studies.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Study]), StudyMembersModule],
  providers: studiesProviders,
  controllers: [StudiesController],
})
export class StudiesModule {}

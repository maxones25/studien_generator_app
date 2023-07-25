import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyMember } from '@entities/study-member.entity';
import { StudyMembersController } from './study-members.controller';
import studyMembersProviders from './study-members.providers';

@Module({
  imports: [TypeOrmModule.forFeature([StudyMember])],
  controllers: [StudyMembersController],
  providers: studyMembersProviders,
})
export class StudyMembersModule {}

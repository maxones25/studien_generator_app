import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyMember } from '../../../entities/study-member.entity';
import { StudyMembersController } from './study-members.controller';
import { StudyMembersService } from './study-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudyMember])],
  controllers: [StudyMembersController],
  providers: [StudyMembersService],
})
export class StudyMembersModule {}

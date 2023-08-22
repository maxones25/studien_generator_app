import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyMember } from '@entities/study-member.entity';
import { MemberGuard } from './member.guard';
import { MembersService } from './members.service';
import membersProviders from './members.providers';

@Module({
  imports: [TypeOrmModule.forFeature([StudyMember])],
  providers: membersProviders,
  exports: [MemberGuard, MembersService],
})
export class MembersModule {}

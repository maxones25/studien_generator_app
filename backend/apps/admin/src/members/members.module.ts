import { Module } from '@nestjs/common';
import { MemberGuard } from './infrastructure/http/guards/member.guard';
import { MembersService } from './application/members.service';
import { MembersDb } from './infrastructure/db';
import * as Provider from '@admin/members/providers';
import * as Domain from '@admin/members/domain';

@Module({
  imports: [MembersDb],
  providers: [
    Provider.MembersRepositoryProvider,
    Provider.AddMemberUseCaseProvider,
    Provider.ChangeMemberRoleUseCaseProvider,
    Provider.RemoveMemberUseCaseProvider,
    Provider.GetStudyRelatedMemberUseCaseProvider,
    Provider.GetMembersByStudyUseCaseProvider,
    MembersService,
    MemberGuard,
  ],
  exports: [
    MemberGuard,
    MembersService,
    Domain.MEMBERS_REPOSITORY,
    Domain.ADD_MEMBER_USE_CASE,
    Domain.CHANGE_MEMBER_ROLE_USE_CASE,
    Domain.REMOVE_MEMBER_USE_CASE,
    Domain.GET_STUDY_RELATED_MEMBER_USE_CASE,
    Domain.GET_MEMBERS_BY_STUDY_USE_CASE,
  ],
})
export class MembersModule {}

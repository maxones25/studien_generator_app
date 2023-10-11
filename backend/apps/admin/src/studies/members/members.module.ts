import { Module } from '@nestjs/common';
import * as Provider from '@admin/studies/members/providers';
import * as Domain from '@admin/studies/members/domain';
import { MembersDb } from './infrastructure/db';
import { MemberGuard, RolesGuard } from './infrastructure/http';

@Module({
  imports: [MembersDb],
  providers: [
    MemberGuard,
    RolesGuard,
    Provider.MembersRepositoryProvider,
    Provider.AddMemberUseCaseProvider,
    Provider.ChangeMemberRoleUseCaseProvider,
    Provider.RemoveMemberUseCaseProvider,
    Provider.GetStudyRelatedMemberUseCaseProvider,
    Provider.GetMembersByStudyUseCaseProvider,
  ],
  exports: [
    MemberGuard,
    RolesGuard,
    Domain.MEMBERS_REPOSITORY,
    Domain.ADD_MEMBER_USE_CASE,
    Domain.CHANGE_MEMBER_ROLE_USE_CASE,
    Domain.REMOVE_MEMBER_USE_CASE,
    Domain.GET_STUDY_RELATED_MEMBER_USE_CASE,
    Domain.GET_MEMBERS_BY_STUDY_USE_CASE,
  ],
})
export class MembersModule {}

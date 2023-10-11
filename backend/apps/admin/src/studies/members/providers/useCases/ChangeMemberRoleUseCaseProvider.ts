import { ChangeMemberRoleUseCase } from '@admin/studies/members/application';
import {
  CHANGE_MEMBER_ROLE_USE_CASE,
  MEMBERS_REPOSITORY,
  IMembersRepository,
} from '@admin/studies/members/domain';
import { Provider } from '@nestjs/common';

export const ChangeMemberRoleUseCaseProvider: Provider = {
  provide: CHANGE_MEMBER_ROLE_USE_CASE,
  useFactory(membersRepository: IMembersRepository) {
    return new ChangeMemberRoleUseCase(membersRepository);
  },
  inject: [MEMBERS_REPOSITORY],
};

import { RemoveMemberUseCase } from '@admin/members/application';
import {
  MEMBERS_REPOSITORY,
  REMOVE_MEMBER_USE_CASE,
  IMembersRepository,
} from '@admin/members/domain';
import { Provider } from '@nestjs/common';

export const RemoveMemberUseCaseProvider: Provider = {
  provide: REMOVE_MEMBER_USE_CASE,
  useFactory(membersRepository: IMembersRepository) {
    return new RemoveMemberUseCase(membersRepository);
  },
  inject: [MEMBERS_REPOSITORY],
};

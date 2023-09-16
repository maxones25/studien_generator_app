import { AddMemberUseCase } from '@admin/members/application';
import {
  ADD_MEMBER_USE_CASE,
  IMembersRepository,
  MEMBERS_REPOSITORY,
} from '@admin/members/domain';
import { Provider } from '@nestjs/common';

export const AddMemberUseCaseProvider: Provider = {
  provide: ADD_MEMBER_USE_CASE,
  useFactory(membersRepository: IMembersRepository) {
    return new AddMemberUseCase(membersRepository);
  },
  inject: [MEMBERS_REPOSITORY],
};

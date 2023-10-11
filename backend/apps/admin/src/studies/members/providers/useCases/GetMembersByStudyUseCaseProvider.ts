import { GetMembersByStudyUseCase } from '@admin/studies/members/application';
import {
  GET_MEMBERS_BY_STUDY_USE_CASE,
  MEMBERS_REPOSITORY,
  IMembersRepository,
} from '@admin/studies/members/domain';
import { Provider } from '@nestjs/common';

export const GetMembersByStudyUseCaseProvider: Provider = {
  provide: GET_MEMBERS_BY_STUDY_USE_CASE,
  useFactory(membersRepository: IMembersRepository) {
    return new GetMembersByStudyUseCase(membersRepository);
  },
  inject: [MEMBERS_REPOSITORY],
};

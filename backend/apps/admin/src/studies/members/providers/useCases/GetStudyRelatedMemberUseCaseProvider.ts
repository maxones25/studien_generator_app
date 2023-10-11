import { GetStudyRelatedMemberUseCase } from '@admin/studies/members/application';
import {
  GET_STUDY_RELATED_MEMBER_USE_CASE,
  MEMBERS_REPOSITORY,
  IMembersRepository,
} from '@admin/studies/members/domain';
import { Provider } from '@nestjs/common';

export const GetStudyRelatedMemberUseCaseProvider: Provider = {
  provide: GET_STUDY_RELATED_MEMBER_USE_CASE,
  useFactory(membersRepository: IMembersRepository) {
    return new GetStudyRelatedMemberUseCase(membersRepository);
  },
  inject: [MEMBERS_REPOSITORY],
};

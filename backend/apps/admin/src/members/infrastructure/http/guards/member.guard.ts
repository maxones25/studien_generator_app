import { RecordGuard } from '@shared/modules/records/record.guard';
import { Inject } from '@nestjs/common';
import {
  GET_STUDY_RELATED_MEMBER_USE_CASE,
  IGetStudyRelatedMemberUseCase,
} from '@admin/Members/domain';

export class MemberGuard extends RecordGuard {
  constructor(
    @Inject(GET_STUDY_RELATED_MEMBER_USE_CASE)
    useCase: IGetStudyRelatedMemberUseCase,
  ) {
    super(useCase, 'member', 'directorId');
  }
}

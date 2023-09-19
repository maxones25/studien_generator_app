import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import {
  GET_STUDY_RELATED_GROUP_USE_CASE,
  IGetStudyRelatedGroupUseCase,
} from '@admin/groups/domain';

@Injectable()
export class GroupGuard extends RecordGuard {
  constructor(
    @Inject(GET_STUDY_RELATED_GROUP_USE_CASE)
    useCase: IGetStudyRelatedGroupUseCase,
  ) {
    super(useCase, 'group', 'groupId');
  }
}

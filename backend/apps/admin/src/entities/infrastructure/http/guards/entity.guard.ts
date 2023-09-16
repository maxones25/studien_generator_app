import { GET_STUDY_RELATED_ENTITY_USE_CASE } from '@admin/entities/domain';
import { Inject, Injectable } from '@nestjs/common';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';
import { RecordGuard } from '@shared/modules/records/record.guard';

@Injectable()
export class EntityGuard extends RecordGuard {
  constructor(
    @Inject(GET_STUDY_RELATED_ENTITY_USE_CASE)
    useCase: IGetStudyRelatedDataUseCase,
  ) {
    super(useCase, 'entity', 'entityId');
  }
}

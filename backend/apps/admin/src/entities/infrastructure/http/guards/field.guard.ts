import {
  GET_STUDY_RELATED_FIELD_USE_CASE,
  IGetStudyRelatedFieldUseCase,
} from '@admin/entities/domain';
import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';

@Injectable()
export class FieldGuard extends RecordGuard {
  constructor(
    @Inject(GET_STUDY_RELATED_FIELD_USE_CASE)
    useCase: IGetStudyRelatedFieldUseCase,
  ) {
    super(useCase, 'field', 'fieldId');
  }
}

import {
  GET_STUDY_RELATED_FORM_CONFIG_USE_CASE,
  IGetStudyRelatedFormConfigUseCase,
} from '@admin/groups/domain';
import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';

@Injectable()
export class FormConfigGuard extends RecordGuard {
  constructor(
    @Inject(GET_STUDY_RELATED_FORM_CONFIG_USE_CASE)
    useCase: IGetStudyRelatedFormConfigUseCase,
  ) {
    super(useCase, 'config', 'configId');
  }
}

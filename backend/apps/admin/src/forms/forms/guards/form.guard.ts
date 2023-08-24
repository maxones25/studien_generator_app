import { Inject, Injectable } from '@nestjs/common';
import { FormsService } from '../services/forms.service';
import { RecordGuard } from '@shared/modules/records/record.guard';

@Injectable()
export class FormGuard extends RecordGuard {
  constructor(
    @Inject(FormsService)
    service: FormsService,
  ) {
    super(service, 'form', 'formId');
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { FieldsService } from '../fields.service';
import { RecordGuard } from '@shared/modules/records/record.guard';

@Injectable()
export class FieldGuard extends RecordGuard {
  constructor(
    @Inject(FieldsService)
    service: FieldsService,
  ) {
    super(service, 'field', 'fieldId');
  }
}

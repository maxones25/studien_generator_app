import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { ComponentsService } from '../services/components.service';

@Injectable()
export class ComponentGuard extends RecordGuard {
  constructor(
    @Inject(ComponentsService)
    service: ComponentsService,
  ) {
    super(service, 'component', 'componentId');
  }
}

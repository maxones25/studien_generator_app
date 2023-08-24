import { Inject, Injectable } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { RecordGuard } from '@shared/modules/records/record.guard';

@Injectable()
export class EntityGuard extends RecordGuard {
  constructor(
    @Inject(EntitiesService)
    service: EntitiesService,
  ) {
    super(service, 'entity', 'entityId');
  }
}

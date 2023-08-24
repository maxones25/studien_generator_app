import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { EntitiesService } from '../services/entities.service';

@Injectable()
export class EntityGuard extends RecordGuard {
  constructor(
    @Inject(EntitiesService)
    service: EntitiesService,
  ) {
    super(service, 'entity', 'entityId');
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { ConfigsService } from '../services/configs.service';

@Injectable()
export class ConfigGuard extends RecordGuard {
  constructor(
    @Inject(ConfigsService)
    service: ConfigsService,
  ) {
    super(service, 'config', 'configId');
  }
}

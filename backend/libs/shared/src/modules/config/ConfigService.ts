import { ConfigService as NestConfigService } from '@nestjs/config';
import { Inject } from '../core/Inject';
import { IConfigService } from './IConfigService';

export class ConfigService implements IConfigService {
  constructor(
    @Inject(NestConfigService)
    private readonly config: NestConfigService,
  ) {}

  get(key: string): string {
    return this.config.get(key);
  }
}

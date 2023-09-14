import { Inject, Injectable } from '@nestjs/common';
import { IConfigService } from '@shared/modules/config/IConfigService';

@Injectable()
export class AppUriGenerator {
  constructor(
    @Inject("IConfigService")
    private readonly configService: IConfigService,
  ) {}

  generate(participantId: string, password: string) {
    const appUri = this.configService.get('STUDY_FRONTED_URI');
    return `${appUri}/login?id=${participantId}&password=${password}`;
  }
}

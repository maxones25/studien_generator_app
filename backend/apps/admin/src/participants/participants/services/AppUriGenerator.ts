import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppUriGenerator {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  generate(participantId: string, password: string) {
    const appUri = this.configService.get('STUDY_FRONTED_URI');
    return `${appUri}/login?id=${participantId}&password=${password}`;
  }
}

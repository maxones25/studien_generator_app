import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_SERVICE, IConfigService } from '@shared/modules/config/IConfigService';

@Injectable()
export class AppUriGenerator {
  constructor(
    @Inject(CONFIG_SERVICE)
    private readonly configService: IConfigService,
  ) {}

  generate(params: Record<string, string> = {}) {
    const appUri = this.configService.get('STUDY_FRONTED_URI');
    const queryParams = Object.keys(params)
    .filter((key) => params[key])
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const uri = `${appUri}/login${
    queryParams !== "" ? `?${queryParams}` : ""
  }`;
    return uri;
  }
}

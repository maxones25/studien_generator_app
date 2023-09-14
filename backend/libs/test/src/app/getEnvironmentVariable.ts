import { INestApplication } from '@nestjs/common';
import { IConfigService } from '@shared/modules/config/IConfigService';

export type GetEnvironmentVariableOptions = 'ACTIVATION_PASSWORD';

export const getEnvironmentVariable = (
  app: INestApplication,
  key: GetEnvironmentVariableOptions,
) => {
  const configService: IConfigService = app.get("IConfigService");
  
  return configService.get(key);
};

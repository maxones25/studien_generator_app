import { INestApplication } from '@nestjs/common';
import {
  CONFIG_SERVICE,
  IConfigService,
} from '@shared/modules/config/IConfigService';

export type GetEnvironmentVariableOptions =
  | 'ACTIVATION_PASSWORD'
  | 'STUDY_FRONTED_URI';

export const getEnvironmentVariable = (
  app: INestApplication,
  key: GetEnvironmentVariableOptions,
) => {
  const configService: IConfigService = app.get(CONFIG_SERVICE);

  return configService.get(key);
};

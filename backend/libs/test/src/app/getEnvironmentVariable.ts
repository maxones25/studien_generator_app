import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type GetEnvironmentVariableOptions = 'ACTIVATION_PASSWORD';

export const getEnvironmentVariable = (
  app: INestApplication,
  key: GetEnvironmentVariableOptions,
) => {
  const configService = app.get(ConfigService);
  return configService.get(key);
};

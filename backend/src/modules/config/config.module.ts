import { ConfigModule as NestConfigModule } from '@nestjs/config';

const ConfigModule = (envFilePath: string | string[]) =>
  NestConfigModule.forRoot({
    envFilePath,
    isGlobal: true,
  });

export default ConfigModule;

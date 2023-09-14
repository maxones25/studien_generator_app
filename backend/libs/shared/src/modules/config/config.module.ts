import { DynamicModule, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './ConfigService';
import { CONFIG_SERVICE } from './IConfigService';

@Global()
export default class ConfigModule {
  static forRoot(envFilePath: string | string[]): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          envFilePath,
        }),
      ],
      providers: [
        {
          provide: CONFIG_SERVICE,
          useClass: ConfigService,
        },
      ],
      exports: [CONFIG_SERVICE],
    };
  }
}

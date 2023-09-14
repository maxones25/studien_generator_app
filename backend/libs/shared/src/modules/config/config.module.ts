import { DynamicModule, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './ConfigService';

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
          provide: 'IConfigService',
          useClass: ConfigService,
        },
      ],
      exports: ['IConfigService'],
    };
  }
}

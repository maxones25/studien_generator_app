import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { IConfigService } from '../../config/IConfigService';
import { DynamicModule } from '@nestjs/common';
import { JwtService } from './JwtService';

export default class JwtModule {
  static forRoot(): DynamicModule {
    return {
      module: JwtModule,
      imports: [
        NestJwtModule.registerAsync({
          global: true,
          useFactory: async (configService: IConfigService) => {
            return {
              secret: configService.get('JWT_SECRET'),
            };
          },
          inject: ['IConfigService'],
        }),
      ],
      providers: [JwtService],
      exports: [JwtService],
    };
  }
}

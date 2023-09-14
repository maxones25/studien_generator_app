import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { IConfigService } from '../config/IConfigService';

const JwtModule = NestJwtModule.registerAsync({
  global: true,
  useFactory: async (configService: IConfigService) => {
    return {
      secret: configService.get('JWT_SECRET'),
    };
  },
  inject: ["IConfigService"],
});

export default JwtModule;

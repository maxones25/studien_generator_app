import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

const JwtModule = NestJwtModule.registerAsync({
  imports: [ConfigModule],
  global: true,
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get<string>('JWT_SECRET'),
    };
  },
  inject: [ConfigService],
});

export default JwtModule;

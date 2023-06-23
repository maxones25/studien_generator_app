import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Director, Participant, StudyMember } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  PasswordService,
  DirectorAuthService,
  ParticipantsAuthService,
} from '@modules/auth/services';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Director, Participant, StudyMember]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PasswordService, DirectorAuthService, ParticipantsAuthService],
  controllers: [AuthController],
})
export class AuthModule {}

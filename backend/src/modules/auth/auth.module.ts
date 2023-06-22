import { Module } from '@nestjs/common';
import { DirectorAuthService } from './director-auth.service';
import { ParticipantsAuthService } from './participant-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Director } from '../../entities/director.entity';
import { Participant } from '../..//entities/participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { StudyToDirector } from '../../entities/studyToDirector.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Director, Participant, StudyToDirector]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET')
        };
      },
      inject: [ConfigService]
    }),
  ],
  providers: [DirectorAuthService, ParticipantsAuthService],
  controllers: [AuthController],
})
export class AuthModule {}

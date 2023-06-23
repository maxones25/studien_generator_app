import { Module } from '@nestjs/common';
import { Director } from '../../entities/director.entity';
import { Participant } from '../../entities/participant.entity';
import { StudyMember } from '../../entities/study-member';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './services/password.service';
import { DirectorAuthService } from './services/director-auth.service';
import { ParticipantsAuthService } from './services/participant-auth.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Director, Participant, StudyMember]),
  ],
  providers: [PasswordService, DirectorAuthService, ParticipantsAuthService],
  controllers: [AuthController],
})
export class AuthModule {}

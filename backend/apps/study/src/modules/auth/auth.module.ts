import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import authProviders from '@study/modules/auth/auth.providers';
import { Participant, ParticipantAttribute } from '@entities';
import { AuthGuard } from '@study/modules/auth/guards/auth.guard';
import { IsParticipantDeletedGuard } from '@study/modules/auth/guards/IsParticipantDeleted.guard';
import { AuthService } from './auth.service';
import { PasswordModule } from '@shared/modules/password/password.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participant, ParticipantAttribute]),
    ConfigModule,
    PasswordModule,
  ],
  providers: authProviders,
  controllers: [AuthController],
  exports: [AuthGuard, IsParticipantDeletedGuard, AuthService],
})
export class AuthModule {}

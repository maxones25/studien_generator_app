import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import authProviders from '@study/modules/auth/auth.providers';
import { Participant } from '@entities';
import { AuthGuard } from '@study/modules/auth/guards/auth.guard';
import { IsParticipantDeletedGuard } from '@study/modules/auth/guards/IsParticipantDeleted.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Participant])],
  providers: authProviders,
  controllers: [AuthController],
  exports: [AuthGuard, IsParticipantDeletedGuard, AuthService],
})
export class AuthModule {}

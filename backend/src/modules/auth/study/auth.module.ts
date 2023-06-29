import { Module } from '@nestjs/common';
import { Participant } from '../../../entities/participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from '../password.service';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Participant])],
  providers: [PasswordService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

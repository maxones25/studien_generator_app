import { Module } from '@nestjs/common';
import { Director } from '../../../entities/director.entity';
import { StudyMember } from '../../../entities/study-member';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from '../password.service';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Director, StudyMember])],
  providers: [PasswordService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

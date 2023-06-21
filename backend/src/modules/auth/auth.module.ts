import { Module } from '@nestjs/common';
import { DirectorAuthService } from './director-auth.service';
import { ParticipantsAuthService } from './participant-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Director } from '../../entities/director.entity';
import { Participant } from '../..//entities/participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Director, Participant]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,  // muss geändert werden !!!
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [DirectorAuthService, ParticipantsAuthService],
  controllers: [AuthController],
})
export class AuthModule {}

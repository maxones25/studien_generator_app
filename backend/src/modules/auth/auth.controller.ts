import { Body, Controller, Post, Inject, forwardRef } from '@nestjs/common';
import { LoginDirectorDto } from './dtos/LoginDirectorDto';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { SignupDirectorDto } from './dtos/SignupDirectorDto';
import { DirectorAuthService } from './services/director-auth.service';
import { ParticipantsAuthService } from './services/participant-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => ParticipantsAuthService))
    private readonly participantAuthService: ParticipantsAuthService,
    @Inject(forwardRef(() => DirectorAuthService))
    private readonly directorAuthService: DirectorAuthService,
  ) {}

  @Post('participants/login')
  async loginParticipant(@Body() loginParticipantDto: LoginParticipantDto) {
    return this.participantAuthService.checkCredentials(loginParticipantDto);
  }

  @Post('directors/login')
  async loginDirector(@Body() loginDirectorDto: LoginDirectorDto) {
    return this.directorAuthService.checkCredentials(loginDirectorDto);
  }

  @Post('directors/signUp')
  async addDirector(@Body() signupDirectors: SignupDirectorDto) {
    return this.directorAuthService.create(signupDirectors);
  }
}

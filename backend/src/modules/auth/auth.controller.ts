import { Body, Controller, Post } from '@nestjs/common';
import {
  ParticipantsAuthService,
  DirectorAuthService,
} from '@modules/auth/services';
import {
  LoginParticipantDto,
  LoginDirectorDto,
  SignupDirectors,
} from '@modules/auth/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly participantAuthService: ParticipantsAuthService,
    private readonly directorAuthService: DirectorAuthService,
  ) {}

  @Post('participants/login')
  async loginParticipant(@Body() loginParticipantDto: LoginParticipantDto) {
    return this.participantAuthService.checkCredentials(loginParticipantDto);
  }

  @Post('participants/create')
  async addParticipant() {
    return this.participantAuthService.create();
  }

  @Post('directors/login')
  async loginDirector(@Body() loginDirectorDto: LoginDirectorDto) {
    return this.directorAuthService.checkCredentials(loginDirectorDto);
  }

  @Post('directors/create')
  async addDirector(@Body() signupDirectors: SignupDirectors) {
    return this.directorAuthService.create(signupDirectors);
  }
}

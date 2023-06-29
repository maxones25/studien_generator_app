import { Body, Controller, Post, Inject, forwardRef } from '@nestjs/common';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginParticipantDto: LoginParticipantDto) {
    return this.authService.checkCredentials(loginParticipantDto);
  }
}

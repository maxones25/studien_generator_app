import { Body, Controller, Post, Inject, forwardRef } from '@nestjs/common';
import { LoginDirectorDto } from './dtos/LoginDirectorDto';
import { SignupDirectorDto } from './dtos/SignupDirectorDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async loginDirector(@Body() loginDirectorDto: LoginDirectorDto) {
    return this.authService.checkCredentials(loginDirectorDto);
  }

  @Post('signUp')
  async addDirector(@Body() signupDirectors: SignupDirectorDto) {
    return this.authService.create(signupDirectors);
  }
}

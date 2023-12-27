import { Body, Controller, Post, Inject, forwardRef, Put } from '@nestjs/common';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { AuthService } from './auth.service';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { ChangePasswordDto } from './dtos/ChangePasswordDto';

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

  @Put('')
  async changePassword(
    @ParticipantId() participantId: string,
    @Body() { newPassword }: ChangePasswordDto,
  ) {
    return this.authService.changePassword(participantId, newPassword);
  }
}

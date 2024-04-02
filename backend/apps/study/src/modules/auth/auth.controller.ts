import { Body, Controller, Post, Inject, forwardRef, Put, Get } from '@nestjs/common';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { AuthService } from './auth.service';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { ChangePasswordDto } from './dtos/ChangePasswordDto';
import { IsInitial } from '@study/decorators/isInitial.decorator';

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

  @Get('participant')
  async getParticipant(
    @ParticipantId() participantId: string,
  ) {
    return this.authService.getParticipant(participantId);
  }

  @Put('')
  async changePassword(
    @ParticipantId() participantId: string,
    @IsInitial() isInitial: boolean,
    @Body() { oldPassword, newPassword }: ChangePasswordDto,
  ) {
    if (isInitial)
      return this.authService.iniateAccount(participantId, newPassword);
    return this.authService.changePassword(participantId, oldPassword, newPassword);
  }
}

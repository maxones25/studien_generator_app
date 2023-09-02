import {
  Body,
  Controller,
  Post,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { DirectorsService } from '../directors.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDirectorDto } from '@admin/directors/dtos/LoginDirectorDto';
import { SignupDirectorDto } from '../dtos/SignupDirectorDto';
import { AdminLoginDto } from '../dtos/AdminLoginDto';

@Controller('auth')
export class AuthCommands {
  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(ConfigService)
    private configService: ConfigService,
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
  ) {}

  @Post('login')
  async loginDirector(@Body() { email, password }: LoginDirectorDto) {
    const directorId = await this.directorsService.getByCredentials(
      email,
      password,
    );

    const accessToken = await this.jwtService.signAsync({
      topic: "Director",
      directorId,
    });

    return {
      accessToken,
    };
  }

  @Post('signUp')
  async signUp(
    @Body()
    { activationPassword, ...data }: SignupDirectorDto,
  ) {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new UnauthorizedException();

    return this.directorsService.create(data);
  }

  @Post('loginAdmin')
  async loginAdmin(
    @Body()
    { activationPassword }: AdminLoginDto,
  ) {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      topic: 'Admin',
    });

    return accessToken;
  }
}

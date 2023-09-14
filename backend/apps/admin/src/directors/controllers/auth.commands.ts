import {
  Body,
  Controller,
  Post,
  Inject,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DirectorsService } from '../services/directors.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDirectorDto } from '@admin/directors/dtos/LoginDirectorDto';
import { SignupDirectorDto } from '../dtos/SignupDirectorDto';
import { AdminLoginDto } from '../dtos/AdminLoginDto';
import { LoginDirectorUseCase } from '../useCases/LoginDirectorUseCase';
import { ILoginDirectorUseCase } from '../domain/ILoginDirectorUseCase';

@Controller('auth')
export class AuthCommands {
  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(ConfigService)
    private configService: ConfigService,
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
    @Inject(LoginDirectorUseCase)
    private readonly logindirectorUseCase: ILoginDirectorUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginDirector(@Body() { email, password }: LoginDirectorDto) {
    return this.logindirectorUseCase.execute({ email, password });
  }

  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body()
    { activationPassword, ...data }: SignupDirectorDto,
  ) {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new UnauthorizedException();

    return this.directorsService.create(data);
  }

  @Post('loginAdmin')
  @HttpCode(HttpStatus.OK)
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

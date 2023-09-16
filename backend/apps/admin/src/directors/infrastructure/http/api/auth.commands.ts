import {
  Body,
  Controller,
  Post,
  Inject,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import {
  LOGIN_DIRECTOR_USE_CASE,
  LOGIN_ADMIN_USE_CASE,
  SIGN_UP_DIRECTOR_USE_CASE,
  ILoginDirectorUseCase,
  ILoginAdminUseCase,
  ISignUpDirectorUseCase,
} from '@admin/directors/domain';
import { ErrorFilter } from '../filters/ErrorFilter';
import { LoginDirectorDto } from '../dtos/LoginDirectorDto';
import { SignupDirectorDto } from '../dtos/SignupDirectorDto';
import { LoginAdminDto } from '../dtos/AdminLoginDto';

@Controller('auth')
@UseFilters(ErrorFilter)
export class AuthCommands {
  constructor(
    @Inject(LOGIN_DIRECTOR_USE_CASE)
    private readonly logindirectorUseCase: ILoginDirectorUseCase,
    @Inject(SIGN_UP_DIRECTOR_USE_CASE)
    private readonly signUpDirectorUseCase: ISignUpDirectorUseCase,
    @Inject(LOGIN_ADMIN_USE_CASE)
    private readonly loginAdminUseCase: ILoginAdminUseCase,
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
    return this.signUpDirectorUseCase.execute({ activationPassword, data });
  }

  @Post('loginAdmin')
  @HttpCode(HttpStatus.OK)
  async loginAdmin(
    @Body()
    { activationPassword }: LoginAdminDto,
  ) {
    return this.loginAdminUseCase.execute({ activationPassword });
  }
}

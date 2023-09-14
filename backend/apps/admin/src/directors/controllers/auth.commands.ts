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
  LoginDirectorDto,
  SignupDirectorDto,
  ILoginAdminUseCase,
  ISignUpDirectorUseCase,
  AdminLoginDto,
} from '../domain';
import { ErrorFilter } from '../filters/ErrorFilter';

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
    data: SignupDirectorDto,
  ) {
    return this.signUpDirectorUseCase.execute({ data });
  }

  @Post('loginAdmin')
  @HttpCode(HttpStatus.OK)
  async loginAdmin(
    @Body()
    { activationPassword }: AdminLoginDto,
  ) {
    return this.loginAdminUseCase.execute({ activationPassword });
  }
}

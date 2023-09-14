import { Inject } from '@shared/modules/core/Inject';
import {
  DIRECTORS_REPOSITORY,
  IDirectorsRepository,
} from '../domain/repositories/IDirectorsRepository';
import {
  DirectorExistsAlreadyError,
  DirectorNotFoundError,
  ILoginDirectorUseCase,
  LoginDirectorInput,
  LoginDirectorOutput,
  WrongPasswordError,
} from '../domain';
import { UnauthorizedException } from '@nestjs/common';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@shared/modules/token/ITokenService';
import {
  IPasswordService,
  PASSWORD_SERVICE,
} from '@shared/modules/password/IPasswordService';

export class LoginDirectorUseCase implements ILoginDirectorUseCase {
  constructor(
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: IDirectorsRepository,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
  ) {}

  async execute({
    email,
    password,
  }: LoginDirectorInput): Promise<LoginDirectorOutput> {
    const director = await this.directorsRepository.getByEmail(email, false);

    if (!director) throw new DirectorNotFoundError();

    if (!(await this.passwordService.compare(password, director.password)))
      throw new WrongPasswordError();

    const accessToken = await this.tokenService.sign({
      topic: 'Director',
      directorId: director.id,
    });

    return { accessToken };
  }
}

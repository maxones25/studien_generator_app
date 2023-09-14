import { Inject } from '@shared/modules/core/Inject';
import { IDirectorsRepository } from '../domain/IDirectorsRepository';
import {
  ILoginDirectorUseCase,
  LoginDirectorInput,
  LoginDirectorOutput,
} from '../domain/ILoginDirectorUseCase';
import { UnauthorizedException } from '@nestjs/common';
import { ITokenService, TOKEN_SERVICE } from '@shared/modules/token/ITokenService';
import { IPasswordService, PASSWORD_SERVICE } from '@shared/modules/password/IPasswordService';

export class LoginDirectorUseCase implements ILoginDirectorUseCase {
  constructor(
    @Inject('IDirectorsRepository')
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

    if (!director) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, director.password)))
      throw new UnauthorizedException();

    const accessToken = await this.tokenService.sign({
      topic: 'Director',
      directorId: director.id,
    });

    return { accessToken };
  }
}

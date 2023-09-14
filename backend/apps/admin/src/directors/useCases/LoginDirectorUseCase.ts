import { Inject } from '@shared/modules/core/Inject';
import { IDirectorsRepository } from '../domain/IDirectorsRepository';
import {
  ILoginDirectorUseCase,
  LoginDirectorInput,
  LoginDirectorOutput,
} from '../domain/ILoginDirectorUseCase';
import { PasswordService } from '@shared/modules/password/password.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class LoginDirectorUseCase implements ILoginDirectorUseCase {
  constructor(
    @Inject('IDirectorsRepository')
    private readonly directorsRepository: IDirectorsRepository,
    @Inject(PasswordService)
    private readonly passwordService: PasswordService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: LoginDirectorInput): Promise<LoginDirectorOutput> {
    const director = await this.directorsRepository.getByEmail(email, false);

    if (!director) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, director.password)))
      throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      topic: 'Director',
      directorId: director.id,
    });

    return { accessToken };
  }
}

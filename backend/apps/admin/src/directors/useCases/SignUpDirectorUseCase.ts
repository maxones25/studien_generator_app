import {
  ISignUpDirectorUseCase,
  SignUpDirectorInput,
} from '../domain/useCases/ISignUpDirectorUseCase';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IDirectorsRepository } from '../domain/repositories/IDirectorsRepository';
import { IPasswordService } from '@shared/modules/password/IPasswordService';
import { IConfigService } from '@shared/modules/config/IConfigService';
import {
  DirectorExistsAlreadyError,
  WrongActivationPasswordError,
} from '../domain';

export class SignUpDirectorUseCase implements ISignUpDirectorUseCase {
  constructor(
    private readonly configService: IConfigService,
    private readonly directorsRepository: IDirectorsRepository,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute({
    data: { activationPassword, email, firstName, lastName, password },
  }: SignUpDirectorInput): Promise<string> {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new WrongActivationPasswordError();

    const foundDirector = await this.directorsRepository.getByEmail(
      email,
      true,
    );

    if (foundDirector) throw new DirectorExistsAlreadyError();

    const hashedPassword = await this.passwordService.hash(password);

    return this.directorsRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
  }
}

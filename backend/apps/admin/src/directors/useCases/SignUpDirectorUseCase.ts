import {
  ISignUpDirectorUseCase,
  SignUpDirectorInput,
} from '../domain/ISignUpDirectorUseCase';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { IDirectorsRepository } from '../domain/IDirectorsRepository';
import { PasswordService } from '@shared/modules/password/password.service';
import { ConfigService } from '@shared/modules/config/ConfigService';

export class SignUpDirectorUseCase implements ISignUpDirectorUseCase {
  constructor(
    @Inject("IConfigService")
    private readonly configService: ConfigService,
    @Inject('IDirectorsRepository')
    private readonly directorsRepository: IDirectorsRepository,
    @Inject(PasswordService)
    private readonly passwordService: PasswordService
  ) {}

  async execute({
    data: { activationPassword, email, firstName, lastName, password },
  }: SignUpDirectorInput): Promise<string> {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new UnauthorizedException();

    const foundDirector = await this.directorsRepository.getByEmail(
      email,
      true,
    );

    if (foundDirector) throw new BadRequestException('director already exists');

    const hashedPassword = await this.passwordService.hash(
      password,
      10,
    );

    return this.directorsRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
  }
}

import { ConfigService } from '@nestjs/config';
import {
  ISignUpDirectorUseCase,
  SignUpDirectorInput,
} from '../domain/ISignUpDirectorUseCase';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { IDirectorsRepository } from '../domain/IDirectorsRepository';

export class SignUpDirectorUseCase implements ISignUpDirectorUseCase {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    @Inject('IDirectorsRepository')
    private readonly directorsRepository: IDirectorsRepository,
  ) {}

  async execute({
    data: { activationPassword, ...data },
  }: SignUpDirectorInput): Promise<string> {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new UnauthorizedException();

    return this.directorsRepository.create(data);
  }
}

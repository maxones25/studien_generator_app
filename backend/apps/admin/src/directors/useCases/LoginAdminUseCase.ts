import {
  ILoginAdminUseCase,
  LoginAdminInput,
  WrongActivationPasswordError,
} from '../domain';
import { IConfigService } from '@shared/modules/config/IConfigService';
import { UnauthorizedException } from '@nestjs/common';
import { ITokenService } from '@shared/modules/token/ITokenService';

export class LoginAdminUseCase implements ILoginAdminUseCase {
  constructor(
    private readonly configService: IConfigService,
    private readonly tokenService: ITokenService,
  ) {}

  execute({ activationPassword }: LoginAdminInput): string {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new WrongActivationPasswordError();

    const accessToken = this.tokenService.sign({
      topic: 'Admin',
    });

    return accessToken;
  }
}

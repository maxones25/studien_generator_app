import {
  ISignUpDirectorUseCase,
  SignUpDirectorInput,
  DirectorExistsAlreadyError,
  WrongActivationPasswordError,
  IDirectorsRepository,
  Director,
} from '@admin/directors/domain';
import { IPasswordService } from '@shared/modules/password';
import { IConfigService } from '@shared/modules/config';

export class SignUpDirectorUseCase implements ISignUpDirectorUseCase {
  constructor(
    private readonly configService: IConfigService,
    private readonly directorsRepository: IDirectorsRepository,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute({
    activationPassword,
    data: { email, firstName, lastName, password },
  }: SignUpDirectorInput): Promise<string> {
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new WrongActivationPasswordError();

    const isRegistered = await this.directorsRepository.isEmailRegistered(
      email,
    );

    if (isRegistered) throw new DirectorExistsAlreadyError();

    const hashedPassword = await this.passwordService.hash(password);

    const director = new Director({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return this.directorsRepository.create(director);
  }
}

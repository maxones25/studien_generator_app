import {
  ISignUpDirectorUseCase,
  SignUpDirectorInput,
  DirectorExistsAlreadyError,
  WrongActivationPasswordError,
  IDirectorsRepository,
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
    data: {  email, firstName, lastName, password },
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

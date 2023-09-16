import {
  IDirectorsRepository,
  DirectorNotFoundError,
  ILoginDirectorUseCase,
  LoginDirectorInput,
  LoginDirectorOutput,
  WrongPasswordError,
} from '@admin/directors/domain';
import { ITokenService } from '@shared/modules/token';
import { IPasswordService } from '@shared/modules/password';

export class LoginDirectorUseCase implements ILoginDirectorUseCase {
  constructor(
    private readonly directorsRepository: IDirectorsRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute({
    email,
    password,
  }: LoginDirectorInput): Promise<LoginDirectorOutput> {
    const director = await this.directorsRepository.getCredentialsByEmail(
      email,
    );

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

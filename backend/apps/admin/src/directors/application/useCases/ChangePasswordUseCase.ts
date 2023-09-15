import {
  ChangePasswordInput,
  IChangePasswordUseCase,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { IPasswordService } from '@shared/modules/password';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private readonly directorsRepository: IDirectorsRepository,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute({
    directorId,
    password,
  }: ChangePasswordInput): Promise<number> {
    const hashedPassword = await this.passwordService.hash(password);

    return this.directorsRepository.changePassword(directorId, hashedPassword);
  }
}

import { MEMBERS_REPOSITORY } from '@admin/Members/domain';
import { MembersRepository } from '@admin/members/infrastructure/db';
import { Provider } from '@nestjs/common';

export const MembersRepositoryProvider: Provider = {
  provide: MEMBERS_REPOSITORY,
  useClass: MembersRepository,
};

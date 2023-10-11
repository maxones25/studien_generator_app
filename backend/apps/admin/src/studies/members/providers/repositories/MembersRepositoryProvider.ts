import { MEMBERS_REPOSITORY } from '@admin/studies/members/domain';
import { MembersRepository } from '@admin/studies/members/infrastructure/db';
import { Provider } from '@nestjs/common';

export const MembersRepositoryProvider: Provider = {
  provide: MEMBERS_REPOSITORY,
  useClass: MembersRepository,
};

import {
  RecordGuard,
  ValidateOptions,
} from '@shared/modules/records/record.guard';
import { Inject } from '@nestjs/common';
import { MembersRepository } from './members.repository';

export class MemberGuard extends RecordGuard {
  constructor(
    @Inject(MembersRepository)
    private readonly membersRepository: MembersRepository,
  ) {
    super('member', 'directorId');
  }

  protected async validate({ id, studyId }: ValidateOptions) {
    return await this.membersRepository.findOne({
      where: {
        studyId,
        directorId: id,
      },
    });
  }
}

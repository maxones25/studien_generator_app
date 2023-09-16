import { RecordGuard } from '@shared/modules/records/record.guard';
import { Inject } from '@nestjs/common';
import { MembersService } from './members.service';

export class MemberGuard extends RecordGuard {
  constructor(
    @Inject(MembersService)
    service: MembersService,
  ) {
    super(service, 'member', 'directorId');
  }
}

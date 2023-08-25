import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { GroupsService } from '../groups.service';

@Injectable()
export class GroupGuard extends RecordGuard {
  constructor(
    @Inject(GroupsService)
    service: GroupsService,
  ) {
    super(service, 'group', 'groupId');
  }
}

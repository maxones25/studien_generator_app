import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { ParticipantsService } from './participants.service';

@Injectable()
export class ParticipantGuard extends RecordGuard {
  constructor(
    @Inject(ParticipantsService)
    service: ParticipantsService,
  ) {
    super(service, 'participant', 'participantId');
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ParticipantsRepository } from './participants.repository';
import {
  RecordGuard,
  ValidateOptions,
} from '@shared/modules/records/record.guard';

@Injectable()
export class ParticipantGuard extends RecordGuard {
  constructor(
    @Inject(ParticipantsRepository)
    private readonly participantsRepository: ParticipantsRepository,
  ) {
    super('participant', 'participantId');
  }

  protected async validate({ studyId, id }: ValidateOptions) {
    return await this.participantsRepository.findOne({
      where: { id, studyId },
    });
  }
}

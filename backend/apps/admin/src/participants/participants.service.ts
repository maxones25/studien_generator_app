import { Injectable, Inject } from '@nestjs/common';
import { Participant } from '@entities/participant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from '@shared/modules/password/password.service';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { ParticipantsRepository } from './participants.repository';
import { CreateParticipantDto } from './dtos/CreateParticipantDto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(ParticipantsRepository)
    private participantsRepository: ParticipantsRepository,
    @Inject(StartParticipantStudyTransaction)
    private startParticipantStudyTransaction: StartParticipantStudyTransaction,
    private passwordService: PasswordService,
  ) {}

  async create(studyId: string, { number, groupId }: CreateParticipantDto) {
    const participant = new Participant();

    const password = await this.passwordService.generate();
    const hashPassword = await this.passwordService.hash(password, 10);

    participant.studyId = studyId;
    participant.groupId = groupId;
    participant.number = number;
    participant.password = hashPassword;

    await this.participantsRepository.insert(participant);

    return participant.id;
  }

  async getById(id: string) {
    const participant = await this.participantsRepository.findOneOrFail({
      where: { id },
      relations: {
        group: true,
        attributes: true,
      },
      select: {
        id: true,
        number: true,
        group: {
          id: true,
          name: true,
        },
        attributes: {
          key: true,
          value: true,
        },
      },
    });
    return this.convertParticipant(participant);
  }

  async changeNumber(id: string, number: string) {
    const { affected } = await this.participantsRepository.update(id, {
      number,
    });
    return affected;
  }

  async changeGroup(id: string, groupId: string) {
    const { affected } = await this.participantsRepository.update(id, {
      groupId,
    });
    return affected;
  }

  async regeneratePassword(participantId: string) {
    const password = await this.passwordService.generate();
    const hashedPassword = await this.passwordService.hash(password, 10);
    await this.participantsRepository.update(
      { id: participantId },
      { password: hashedPassword },
    );
    return { password: password };
  }

  async start(participantId: string) {
    this.startParticipantStudyTransaction.run({ participantId });
  }

  async getByStudy(studyId: string) {
    const participants = await this.participantsRepository.find({
      where: { studyId },
      order: {
        number: 'ASC',
      },
      relations: {
        group: true,
        attributes: true,
      },
      select: {
        id: true,
        number: true,
        group: {
          id: true,
          name: true,
        },
        attributes: {
          key: true,
          value: true,
        },
      },
    });
    return participants.map(this.convertParticipant);
  }

  async getByGroup(groupId: string): Promise<Participant[]> {
    return this.participantsRepository.find({ where: { groupId } });
  }

  async delete(id: string) {
    const { affected } = await this.participantsRepository.delete({ id });
    return affected;
  }

  private convertParticipant(participant: Participant) {
    const { attributes, ...data } = participant;
    return {
      ...data,
      ...attributes.reduce((obj, { key, value }) => {
        obj[key] = value;
        return obj;
      }, {}),
    };
  }
}

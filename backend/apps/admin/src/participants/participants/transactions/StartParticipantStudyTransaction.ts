import { Participant, Task } from '@entities';
import { BadRequestException, Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Transaction } from '@shared/modules/transaction/transaction';
import { EntityManager } from 'typeorm';
import { AppUriGenerator } from '../services/AppUriGenerator';
import { TasksRepository } from '@admin/participants/tasks/tasks.repository';
import { TasksCalculator } from '@admin/participants/tasks/services/task-calculator.service';
import { StudiesService } from '@admin/studies/studies/application';
import { SchedulesTransformer } from '../services/SchedulesTransformer';
import { StartStudyConfig } from '../dtos/StartStudyDto';
import { ParticipantsService } from '../participants.service';
import {
  IPasswordService,
  PASSWORD_SERVICE,
} from '@shared/modules/password/IPasswordService';

type TransactionInput = {
  participantId: string;
  startDate: Date;
  configs: StartStudyConfig[];
};

export class StartParticipantStudyTransaction extends Transaction<
  TransactionInput,
  Record<string, string>
> {
  private readonly participantsService: ParticipantsService;
  private readonly tasksRepository: TasksRepository;

  constructor(
    @InjectEntityManager()
    em: EntityManager,
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
    @Inject(PASSWORD_SERVICE)
    passwordService: IPasswordService,
    @Inject(AppUriGenerator)
    private readonly appUriGenerator: AppUriGenerator,
    @Inject(TasksCalculator)
    private readonly tasksCalculator: TasksCalculator,
    @Inject(SchedulesTransformer)
    private readonly schedulesTransformer: SchedulesTransformer,
  ) {
    super(em);
    this.participantsService = ParticipantsService.build(em, passwordService);
    this.tasksRepository = new TasksRepository(em.getRepository(Task));
  }

  protected async execute({
    participantId,
    startDate,
    configs,
  }: TransactionInput): Promise<Record<string, string>> {
    const participant = await this.participantsService.getById(participantId)
    if (participant.group.id === null)
      throw new BadRequestException('participant must have a group');

    const schedules =
      await this.schedulesTransformer.generateParticipantSchedules(
        participant.group.id,
        configs,
      );

    const duration = await this.studiesService.getDuration(participant.studyId);

    const tasks = this.tasksCalculator.generate({
      participantId: participant.id,
      schedules,
      startDate,
      duration,
    });

    await this.participantsService.setStartDate(participant.id, startDate);
    await this.participantsService.setIsInitial(participant.id, true);

    await this.tasksRepository.createBatch(tasks);

    const password = await this.participantsService.updatePassword(
      participant.id,
    );
    const uri = this.appUriGenerator.generate();
    const loginId = `${participant.study.name}-${participant.number}`;

    return { uri, loginId, password };
  }
}

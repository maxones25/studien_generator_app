import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Inject,
} from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { CreateParticipantDto } from '../dtos/CreateParticipantDto';
import { Roles } from '@admin/roles/roles.decorator';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { ParticipantGuard } from '../guards/participant.guard';
import { ChangeNumberDto } from '../dtos/ChangeNumberDto';
import { ChangeGroupDto } from '../dtos/ChangeGroupDto';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { StartStudyDto } from '../dtos/StartStudyDto';
import { Participant } from '../participant.decorator';
import { Participant as ParticipantEntity } from '@entities';
import { IsStudyActiveGuard } from '@admin/studies/studies/guards/IsStudyActiveGuard';
import { StartParticipantStudyTransaction } from '../transactions/StartParticipantStudyTransaction';
import { CreateParticipantTransaction } from '../transactions/CreateParticipantTransaction';
import { ResetPasswordUseCase } from '../transactions/ResetPasswordUseCase';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('participants')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class ParticipantsCommands {
  constructor(
    @Inject(ParticipantsService)
    private readonly participantsService: ParticipantsService,
    @Inject(StartParticipantStudyTransaction)
    private readonly startParticipantStudyTransaction: StartParticipantStudyTransaction,
    @Inject(CreateParticipantTransaction)
    private readonly createParticipantTransaction: CreateParticipantTransaction,
    @Inject(ResetPasswordUseCase)
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() { number, groupId }: CreateParticipantDto,
  ) {
    return this.createParticipantTransaction.run({
      studyId,
      groupId,
      number,
    });
  }

  @Post('changeNumber')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async changeNumber(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { number }: ChangeNumberDto,
  ) {
    return await this.participantsService.changeNumber(participantId, number);
  }

  @Post('changeGroup')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async changeGroup(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { groupId }: ChangeGroupDto,
  ) {
    return await this.participantsService.changeGroup(participantId, groupId);
  }

  @Post('delete')
  @Roles('admin')
  @UseGuards(ParticipantGuard)
  async delete(@Query() { participantId }: ParticipantQueryDto) {
    return await this.participantsService.delete(participantId);
  }

  @Post('startStudy')
  @Roles('admin')
  @UseGuards(ParticipantGuard, IsStudyActiveGuard)
  async startStudy(
    @Participant() participant: ParticipantEntity,
    @Body() { startDate, configs }: StartStudyDto,
  ) {
    return this.startParticipantStudyTransaction.run({
      participant,
      startDate,
      configs,
    });
  }

  @Post('resetPassword')
  @Roles('admin')
  async resetPassword(@Query() { participantId }: ParticipantQueryDto) {
    const result = await this.resetPasswordUseCase.run({ participantId });
    return result.commit();
  }
}

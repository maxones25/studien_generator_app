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
import { DeleteDto } from '@shared/modules/records/DeleteDto';
import { IsParticipantDeletedGuard } from '../guards/IsParticipantDeletedGuard';
import { DeleteParticipantTransaction } from '../transactions/DeleteParticipantTransaction';

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
    @Inject(DeleteParticipantTransaction)
    private readonly deleteParticipant: DeleteParticipantTransaction,
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
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async changeNumber(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { number }: ChangeNumberDto,
  ) {
    return await this.participantsService.changeNumber(participantId, number);
  }

  @Post('changeGroup')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async changeGroup(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { groupId }: ChangeGroupDto,
  ) {
    return await this.participantsService.changeGroup(participantId, groupId);
  }

  @Post('removeGroup')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async removeGroup(@Query() { participantId }: ParticipantQueryDto) {
    return await this.participantsService.removeGroup(participantId);
  }

  @Post('delete')
  @Roles('admin')
  @UseGuards(ParticipantGuard)
  async delete(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { hardDelete, deleteRelated }: DeleteDto,
  ) {
    return this.deleteParticipant.run({
      participantId,
      hardDelete,
      deleteRelated,
    });
  }

  @Post('restore')
  @Roles('admin')
  @UseGuards(ParticipantGuard)
  async restore(@Query() { participantId }: ParticipantQueryDto) {
    return await this.participantsService.restore(participantId);
  }

  @Post('startStudy')
  @Roles('admin')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard, IsStudyActiveGuard)
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
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async resetPassword(@Query() { participantId }: ParticipantQueryDto) {
    return this.resetPasswordUseCase.run({ participantId });
  }
}

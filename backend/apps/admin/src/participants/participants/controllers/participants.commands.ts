import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { CreateParticipantDto } from '../dtos/CreateParticipantDto';
import { Roles } from '@admin/members/infrastructure/http';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { ParticipantGuard } from '../guards/participant.guard';
import { ChangeNumberDto } from '../dtos/ChangeNumberDto';
import { ChangeGroupDto } from '../dtos/ChangeGroupDto';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { StartStudyDto } from '../dtos/StartStudyDto';
import { GetParticipant } from '../participant.decorator';
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
import { GroupGuard } from '@admin/groups/guards/group.guard';
import { GroupQueryDto } from '@admin/groups/dtos/GroupQueryDto';

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
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async changeNumber(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { number }: ChangeNumberDto,
  ) {
    return await this.participantsService.changeNumber(participantId, number);
  }

  @Post('changeGroup')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard, GroupGuard)
  async changeGroup(
    @Query() { participantId }: ParticipantQueryDto,
    @Query() { groupId }: GroupQueryDto,
  ) {
    return await this.participantsService.changeGroup(participantId, groupId);
  }

  @Post('removeGroup')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async removeGroup(@Query() { participantId }: ParticipantQueryDto) {
    return await this.participantsService.removeGroup(participantId);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(ParticipantGuard)
  async restore(@Query() { participantId }: ParticipantQueryDto) {
    return await this.participantsService.restore(participantId);
  }

  @Post('startStudy')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard, IsStudyActiveGuard)
  async startStudy(
    @GetParticipant() participant: ParticipantEntity,
    @Body() { startDate, configs }: StartStudyDto,
  ) {
    return this.startParticipantStudyTransaction.run({
      participant,
      startDate,
      configs,
    });
  }

  @Post('resetPassword')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async resetPassword(@Query() { participantId }: ParticipantQueryDto) {
    return this.resetPasswordUseCase.run({ participantId });
  }
}

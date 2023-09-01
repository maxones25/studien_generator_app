import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudiesService } from '../studies.service';
import { CreateStudyDto } from '../dtos/CreateStudyDto';
import { ChangeNameDto } from '../dtos/ChangeNameDto';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/decorators/director-id.decorator';
import { StudyGuard } from '../guards/study.guard';
import { SetDurationDto } from '../dtos/SetDurationDto';
import { SetDateDto } from '../dtos/SetDateDto';
import { StudyQueryDto } from '../dtos/StudyQueryDto';
import { SetActivationDto } from '../dtos/SetActivationDto';
import { DeleteDto } from '@shared/modules/records/DeleteDto';
import { IsStudyDeletedGuard } from '../guards/IsStudyDeletedGuard';

@Controller('studies')
export class StudiesCommands {
  constructor(private readonly studiesService: StudiesService) {}

  @Post('create')
  async create(@DirectorId() directorId: string, @Body() body: CreateStudyDto) {
    return this.studiesService.create(directorId, body);
  }

  @Post('changeName')
  @UseGuards(StudyGuard, IsStudyDeletedGuard)
  @Roles('admin')
  async update(
    @Query() { studyId }: StudyQueryDto,
    @Body() { name }: ChangeNameDto,
  ) {
    return this.studiesService.changeName(studyId, name);
  }

  @Post('setDuration')
  @Roles('admin')
  @UseGuards(StudyGuard, IsStudyDeletedGuard)
  async setDuration(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: SetDurationDto,
  ) {
    return this.studiesService.setDuration(studyId, body);
  }

  @Post('delete')
  @Roles('admin')
  @UseGuards(StudyGuard)
  async delete(
    @Query() { studyId }: StudyQueryDto,
    @Body() { hardDelete }: DeleteDto,
  ) {
    if (hardDelete) {
      return this.studiesService.hardDelete(studyId);
    } else {
      return this.studiesService.softDelete(studyId);
    }
  }

  @Post('restore')
  @Roles('admin')
  @UseGuards(StudyGuard)
  async restore(@Query() { studyId }: StudyQueryDto) {
    return this.studiesService.restore(studyId);
  }

  @Post('setStartDate')
  @Roles('admin')
  @UseGuards(StudyGuard, IsStudyDeletedGuard)
  async setStartDate(
    @Query() { studyId }: StudyQueryDto,
    @Body() { date }: SetDateDto,
  ) {
    const startDate = new Date(date);
    return this.studiesService.setStartDate(studyId, startDate);
  }

  @Post('setEndDate')
  @Roles('admin')
  @UseGuards(StudyGuard, IsStudyDeletedGuard)
  async setEndDate(
    @Query() { studyId }: StudyQueryDto,
    @Body() { date }: SetDateDto,
  ) {
    const endDate = new Date(date);
    return this.studiesService.setEndDate(studyId, endDate);
  }

  @Post('setActivation')
  @Roles('admin')
  @UseGuards(StudyGuard, IsStudyDeletedGuard)
  async setActivation(
    @Query() { studyId }: StudyQueryDto,
    @Body() { isActive }: SetActivationDto,
  ) {
    if (isActive) {
      return this.studiesService.activate(studyId);
    } else {
      return this.studiesService.deactivate(studyId);
    }
  }
}

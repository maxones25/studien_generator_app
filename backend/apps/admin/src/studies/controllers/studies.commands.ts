import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudiesService } from '../studies.service';
import { CreateStudyDto } from '../dtos/CreateStudyDto';
import { ChangeNameDto } from '../dtos/ChangeNameDto';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/director-id.decorator';
import { StudyGuard } from '../study.guard';
import { SetDurationDto } from '../dtos/SetDurationDto';
import { SetDateDto } from '../dtos/SetDateDto';
import { StudyQueryDto } from '../dtos/StudyQueryDto';
import { SetActivationDto } from '../dtos/SetActivationDto';

@Controller('studies')
@UseGuards(StudyGuard)
export class StudiesCommands {
  constructor(private readonly studiesService: StudiesService) {}

  @Post('create')
  async create(@DirectorId() directorId: string, @Body() body: CreateStudyDto) {
    return this.studiesService.create(directorId, body);
  }

  @Post('changeName')
  @Roles('admin')
  async update(
    @Query() { studyId }: StudyQueryDto,
    @Body() { name }: ChangeNameDto,
  ) {
    return this.studiesService.changeName(studyId, name);
  }

  @Delete(':studyId')
  @Roles('admin')
  async delete(@Param('studyId') studyId: string) {
    return this.studiesService.delete(studyId);
  }

  @Post('start')
  @Roles('admin')
  async startStudy(@Query() { studyId }: StudyQueryDto) {
    return this.studiesService.start(studyId);
  }

  @Post('setDuration')
  @Roles('admin')
  async setDuration(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: SetDurationDto,
  ) {
    return this.studiesService.setDuration(studyId, body);
  }

  @Post('setStartDate')
  @Roles('admin')
  async setStartDate(
    @Query() { studyId }: StudyQueryDto,
    @Body() { date }: SetDateDto,
  ) {
    return this.studiesService.setStartDate(studyId, date);
  }

  @Post('setEndDate')
  @Roles('admin')
  async setEndDate(
    @Query() { studyId }: StudyQueryDto,
    @Body() { date }: SetDateDto,
  ) {
    return this.studiesService.setEndDate(studyId, date);
  }

  @Post('setActivation')
  @Roles('admin')
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

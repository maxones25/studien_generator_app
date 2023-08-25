import { Controller, Param, Get, Query } from '@nestjs/common';
import { FormsService } from './forms.service';
import { StudyId } from '@study/decorators/study-id.decorator';
import { GroupId } from '@study/decorators/group-id.decorator';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  async getForms(
    @StudyId() studyId: string, 
    @GroupId() groupId: string,
    @Query('lastUpdated') lastUpdated?: string,
    @Query('formId') formId?: string,
    @Query('timeIndependent') timeIndependent?: boolean,
  ) {
    if (formId) {
      return await this.formsService.getById(formId);
    }
    if (timeIndependent) {
      return await this.formsService.getAllTimeIndependent(studyId, groupId);
    }
    if (lastUpdated) {
      const date = new Date(lastUpdated);
      return await this.formsService.getAll(studyId, groupId, date);
    }
    return await this.formsService.getAll(studyId, groupId);
  }
}
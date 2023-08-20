import { Controller, Param, Get } from '@nestjs/common';
import { FormsService } from './forms.service';
import { StudyId } from '@study/decorators/study-id.decorator';
import { GroupId } from '@study/decorators/group-id.decorator';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get(':formId')
  async getById(
    @Param('formId', new ValidateIdPipe()) formId: string,
    ) {
    return await this.formsService.getById(formId);
  }

  @Get()
  async getAll(
    @StudyId() studyId: string, 
    @GroupId() groupId: string,
    ) {
    return await this.formsService.getAll(studyId, groupId);
  }

  @Get('/:lastUpdated')
  async getAllNew(
    @Param('lastUpdated') lastUpdated: string,
    @StudyId() studyId: string, 
    @GroupId() groupId: string,
  ) {
    const date = new Date(lastUpdated);
    return await this.formsService.getAll(studyId, groupId, date);
  }

  @Get('time/independent')
  async getTimeIndependent(
    @StudyId() studyId: string,
    @GroupId() groupId: string,
  ) {
    return await this.formsService.getAllTimeIndependent(studyId, groupId);
  }
}

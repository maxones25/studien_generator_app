import {
  Controller,
  Param,
  Get,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';
import { Types } from 'src/decorators/type.decorator';
import { StudyId } from 'src/decorators/study-id.decorator';
import { GroupId } from 'src/decorators/groud-id.decorator';
import { group } from 'test/fakeData';

@Controller('forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
  ) {}

  @Types('participant')
  @Get(':formId')
  async getById(
    @Param('formId', new ValidateIdPipe()) formId: string,
  ) {
    return await this.formsService.getById(formId);
  }

  @Types('participant')
  @Get()
  async getAll(
    @StudyId() studyId: string,
    @GroupId() groupId: string,
  ) {
    return await this.formsService.getAll(studyId, groupId);
  }

  @Types('participant')
  @Get('time/independent')
  async getTimeIndependent(
    @StudyId() studyId: string,
    @GroupId() groupId: string,
  ) {
    return await this.formsService.getAllTimeIndependent(studyId, groupId);
  }
}

import { Controller, Post, Param, Query, Get, Body } from '@nestjs/common';
import { FormsService } from './forms.service';
import { Types } from '../../decorators/type.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { GetFormsQueryParamsDto } from './dtos/GetFormsQueryParamsDto';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';
import { CreateFormDto } from './dtos/CreateFormDto';

@Controller('studies/:studyId/entities/:entityId/forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post()
  async create(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Body() body: CreateFormDto,
  ) {
    return this.formsService.create(entityId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Query() { groupId }: GetFormsQueryParamsDto,
  ) {
    if (groupId) {
      return this.formsService.getGroupForm(entityId, groupId);
    } else {
      return this.formsService.getStudyForm(entityId);
    }
  }
}

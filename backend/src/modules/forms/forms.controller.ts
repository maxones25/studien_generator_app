import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { Types } from '../../decorators/type.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';
import { CreateFormDto } from './dtos/CreateFormDto';
import { UpdateFormDto } from './dtos/UpdateFormDto';

@Controller('studies/:studyId/forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
  ) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post()
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Body() body: CreateFormDto,
  ) {
    return this.formsService.create(studyId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll(@Param('studyId', new ValidateIdPipe()) studyId: string) {
    return this.formsService.getAll(studyId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get(':formId')
  async getById(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formsService.getById(formId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Put(':formId')
  async update(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: UpdateFormDto,
  ) {
    return this.formsService.update(formId, body);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':formId')
  async delete(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formsService.delete(formId);
  }
}

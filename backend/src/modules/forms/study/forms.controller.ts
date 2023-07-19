import {
  Controller,
  Param,
  Get,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';
import { Types } from 'src/decorators/type.decorator';

@Controller('studies/:studyId/forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
  ) {}

  @Types('director')
  @Get(':formId')
  async getById(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formsService.getById(formId);
  }
}

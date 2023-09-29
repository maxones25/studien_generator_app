import {
  Controller,
  Get,
  Query,
  UseGuards,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { Roles } from '@admin/members/infrastructure/http';
import {
  EntityQueryDto,
  EntityGuard,
} from '@admin/entities/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { ErrorFilter } from '@admin/entities/infrastructure/http';
import {
  GET_FIELDS_BY_ENTITY_USE_CASE,
  IGetFieldsByEntityUseCase,
} from '@admin/entities/domain';

@Controller('entities')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard)
export class FieldsQueries {
  constructor(
    @Inject(GET_FIELDS_BY_ENTITY_USE_CASE)
    private readonly getFieldsByEntityUseCase: IGetFieldsByEntityUseCase,
  ) {}

  @Get('getFields')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async getFields(@Query() { entityId }: EntityQueryDto) {
    return this.getFieldsByEntityUseCase.execute({ entityId });
  }
}

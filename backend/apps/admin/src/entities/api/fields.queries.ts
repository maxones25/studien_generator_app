import {
  Controller,
  Get,
  Query,
  UseGuards,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { Roles } from '@admin/roles/roles.decorator';
import { EntityQueryDto } from '@admin/entities/infrastructure/http/dtos/EntityQueryDto';
import { EntityGuard } from '@admin/entities/infrastructure/http/guards/entity.guard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FieldsService } from '../application';
import { ErrorFilter } from '../infrastructure/http';

@Controller('entities')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard)
export class FieldsQueries {
  constructor(
    @Inject(FieldsService)
    private readonly fieldsService: FieldsService,
  ) {}

  @Get('getFields')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async getFields(@Query() { entityId }: EntityQueryDto) {
    return this.fieldsService.getByEntity(entityId);
  }
}

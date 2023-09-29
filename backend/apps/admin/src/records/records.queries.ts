import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyQueryDto } from '@admin/studies/studies/infrastructure/http/dtos/StudyQueryDto';
import { RecordsQueryDto } from './dtos/RecordsQueryDto';
import { ExportParamsDto } from './dtos/ExportParamsDto';

@Controller('records')
@UseGuards(StudyGuard)
export class RecordsQueries {
  constructor(
    @Inject(RecordsService)
    private readonly recordsService: RecordsService,
  ) {}

  @Get()
  @Roles('admin', 'employee')
  get(@Query() { studyId }: StudyQueryDto, @Query() query: RecordsQueryDto) {
    return this.recordsService.get(studyId, query);
  }

  @Post('export')
  @Roles('admin', 'employee')
  exportData(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: ExportParamsDto,
  ) {
    return this.recordsService.export(studyId, body);
  }
}

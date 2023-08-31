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
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { RecordsQueryDto } from './dtos/RecordsQueryDto';
import { ExportParamsDto } from './dtos/ExportParamsDto';

@Controller('records')
@UseGuards(StudyGuard)
export class RecordsController {
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
  export(@Query() { studyId }: StudyQueryDto, @Body() body: ExportParamsDto) {
    return this.recordsService.export(studyId, body);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { StudiesService } from './studies.service';
import { Roles } from '../../decorators/roles.decorator';
import { CreateStudyDto } from './dtos/createStudyDto';
import { AddOrRemoveDirector } from './dtos/addOrRemoveDirector';
import { UpdateEmployeeDto } from './dtos/updateEmployeeDto';
import { Types } from '../../decorators/type.decorator';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Types('director')
  @Get()
  async findAll() {
    return this.studiesService.findAll();
  }

  @Types('director')
  @Post()
  async create(
    @Body() createStudyDto: CreateStudyDto,
    @Request() req,
    ) {
    return this.studiesService.create(createStudyDto, req.payload.directorId);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':studyId')
  async delete(@Param('studyId') studyId: string) {
    return this.studiesService.delete(studyId);
  }

  @Types('director')
  @Roles('admin')
  @Post(':studyId/members')
  async addEmployee(
    @Param('studyId') studyId: string,
    @Body() addOrRemoveDirector: AddOrRemoveDirector,
  ) {
    return this.studiesService.addEmployee(studyId, addOrRemoveDirector);
  }

  @Types('director')
  @Roles('admin')
  @Put(':studyId/members/:directorId')
  async transferAdmin(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.studiesService.updateEmployee(
      studyId,
      directorId,
      updateEmployeeDto,
    );
  }

  @Types('director')
  @Roles('admin')
  @Delete(':studyId/members/:directorId')
  async deleteDirector(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
    @Request() req,
  ) {
    console.log(req.payload)
    return this.studiesService.removeEmployee(studyId, directorId);
  }
}

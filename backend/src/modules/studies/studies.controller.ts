import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { Roles } from '../../decorators/roles.decorator';
import { CreateStudyDto } from './dtos/createStudyDto';
import { DeleteStudyDto } from './dtos/deleteStudyDto';
import { AddOrRemoveDirector } from './dtos/addOrRemoveDirector';
import { TransferAdminDto } from './dtos/transferAdminDto';
import { Types } from '../../decorators/type.decorator';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Roles('admin, employee')
  @Get('all')
  async findAll() {
    return this.studiesService.findAll();
  }

  @Types('director')
  @Post('create')
  async create(@Body()createStudyDto: CreateStudyDto) {
    return this.studiesService.create(createStudyDto);
  }

  @Roles('admin')
  @Post('delete')
  async delete(@Body()deleteStudyDto: DeleteStudyDto) {
    return this.studiesService.delete(deleteStudyDto);
  }

  @Roles('admin')
  @Post('employee/add')
  async addEmployee(@Body()addOrRemoveDirector: AddOrRemoveDirector) {
    return this.studiesService.addEmployee(addOrRemoveDirector);
  }

  @Roles('admin')
  @Post('employee/remove')
  async deleteDirector(@Body()addOrRemoveDirector: AddOrRemoveDirector) {
    return this.studiesService.removeEmployee(addOrRemoveDirector);
  }

  @Roles('admin')
  @Post('transfer')
  async transferAdmin(@Body()transferAdminDto: TransferAdminDto) {
    return this.studiesService.transferAdmin(transferAdminDto);
  }
}

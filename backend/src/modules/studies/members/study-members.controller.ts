import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from '../../../decorators/roles.decorator';
import { AddMemberDto } from './dtos/AddMemberDto';
import { UpdateMemberDto } from './dtos/UpdateMemberDto';
import { Types } from '../../../decorators/type.decorator';
import { StudyMembersService } from './study-members.service';

@Controller('studies/:studyId/members')
export class StudyMembersController {
  constructor(private readonly studyMembersService: StudyMembersService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async findMembersByStudy(@Param('studyId') studyId: string) {
    return this.studyMembersService.getByStudy(studyId);
  }

  @Types('director')
  @Roles('admin')
  @Post()
  async addMember(
    @Param('studyId') studyId: string,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.studyMembersService.addToStudy(studyId, addMemberDto);
  }

  @Types('director')
  @Roles('admin')
  @Put(':directorId')
  async updateMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
    @Body() updatedMember: UpdateMemberDto,
  ) {
    return this.studyMembersService.updateMember(
      studyId,
      directorId,
      updatedMember,
    );
  }

  @Types('director')
  @Roles('admin')
  @Delete(':directorId')
  async removeMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
  ) {
    return this.studyMembersService.removeFromStudy(studyId, directorId);
  }
}

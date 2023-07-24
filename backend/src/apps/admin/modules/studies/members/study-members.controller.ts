import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddMemberDto } from './dtos/AddMemberDto';
import { UpdateMemberDto } from './dtos/UpdateMemberDto';
import { StudyMembersService } from './study-members.service';
import { StudyMemberGuard } from './guards/study-member.guard';
import { Roles } from '@admin/modules/roles/roles.decorator';

@Controller('studies/:studyId/directors')
@UseGuards(StudyMemberGuard)
export class StudyMembersController {
  constructor(private readonly studyMembersService: StudyMembersService) {}

  @Get()
  async findMembersByStudy(@Param('studyId') studyId: string) {
    return this.studyMembersService.getByStudy(studyId);
  }

  @Roles('admin')
  @Post()
  async addMember(
    @Param('studyId') studyId: string,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.studyMembersService.addToStudy(studyId, addMemberDto);
  }

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

  @Roles('admin')
  @Delete(':directorId')
  async removeMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
  ) {
    return this.studyMembersService.removeFromStudy(studyId, directorId);
  }
}

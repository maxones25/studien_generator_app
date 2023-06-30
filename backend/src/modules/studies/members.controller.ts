import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { AddMemberDto } from './dtos/addMemberDto';
import { UpdateMemberDto } from './dtos/updateMemberDto';
import { Types } from '../../decorators/type.decorator';
import { MembersService } from './members.service';

@Controller('studies/:studyId/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async findMembersByStudy(@Param('studyId') studyId: string) {
    return this.membersService.getByStudy(studyId);
  }

  @Types('director')
  @Roles('admin')
  @Post()
  async addMember(
    @Param('studyId') studyId: string,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.membersService.addToStudy(studyId, addMemberDto);
  }

  @Types('director')
  @Roles('admin')
  @Put(':directorId')
  async updateMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
    @Body() updatedMember: UpdateMemberDto,
  ) {
    return this.membersService.updateMember(studyId, directorId, updatedMember);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':directorId')
  async removeMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
  ) {
    return this.membersService.removeFromStudy(studyId, directorId);
  }
}

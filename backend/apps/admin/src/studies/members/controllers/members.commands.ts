import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoleDto } from '../dtos/RoleDto';
import { Roles } from '@admin/roles/roles.decorator';
import { MemberGuard } from '../member.guard';
import { MembersService } from '../members.service';
import { DirectorGuard } from '@admin/directors/guards/director.guard';
import { MemberQueryDto } from '@admin/studies/studies/dtos/MemberQueryDto';
import { Director } from '@admin/directors/decorators/director.decorator';
import { Director as DirectorEntity } from '@entities';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('members')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class MembersCommands {
  constructor(
    @Inject(MembersService)
    private readonly membersService: MembersService,
  ) {}

  @Post('add')
  @Roles('admin')
  @UseGuards(DirectorGuard)
  async add(
    @Director() director: DirectorEntity,
    @Query() { studyId, directorId }: MemberQueryDto,
    @Body() { role }: RoleDto,
  ) {
    await this.membersService.add(studyId, directorId, role);
    return director;
  }

  @Post('changeRole')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(DirectorGuard, MemberGuard)
  async changeRole(
    @Director() director: DirectorEntity,
    @Query() { studyId, directorId }: MemberQueryDto,
    @Body() { role }: RoleDto,
  ) {
    await this.membersService.changeRole(studyId, directorId, role);
    return director;
  }

  @Post('remove')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(MemberGuard)
  async remove(@Query() { studyId, directorId }: MemberQueryDto) {
    await this.membersService.remove(studyId, directorId);
  }
}

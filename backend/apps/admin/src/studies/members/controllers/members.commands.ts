import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleDto } from '../dtos/RoleDto';
import { Roles } from '@admin/roles/roles.decorator';
import { MemberGuard } from '../member.guard';
import { MembersService } from '../members.service';
import { DirectorGuard } from '@admin/directors/director.guard';
import { MemberQueryDto } from '@admin/studies/dtos/MemberQueryDto';
import { Director } from '@admin/directors/director.decorator';
import { Director as DirectorEntity } from '@entities';

@Controller('members')
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
  @Roles('admin')
  @UseGuards(MemberGuard)
  async remove(@Query() { studyId, directorId }: MemberQueryDto) {
    await this.membersService.remove(studyId, directorId);
  } 
}

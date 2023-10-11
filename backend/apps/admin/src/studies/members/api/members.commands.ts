import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import {
  ADD_MEMBER_USE_CASE,
  CHANGE_MEMBER_ROLE_USE_CASE,
  IAddMemberUseCase,
  IChangeMemberRoleUseCase,
  IRemoveMemberUseCase,
  REMOVE_MEMBER_USE_CASE,
} from '@admin/studies/members/domain';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';
import { Roles } from '@admin/studies/members/infrastructure/http';
import {
  GetDirector,
  DirectorGuard,
} from '@admin/directors/infrastructure/http';
import { Director } from '@admin/directors/domain';
import {
  ErrorFilter,
  MemberGuard,
  MemberQueryDto,
  RoleDto,
} from '@admin/studies/members/infrastructure/http';

@Controller('members')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class MembersCommands {
  constructor(
    @Inject(ADD_MEMBER_USE_CASE)
    private readonly addMemberUseCase: IAddMemberUseCase,
    @Inject(CHANGE_MEMBER_ROLE_USE_CASE)
    private readonly changeMemberRoleUseCase: IChangeMemberRoleUseCase,
    @Inject(REMOVE_MEMBER_USE_CASE)
    private readonly removeMemberUseCase: IRemoveMemberUseCase,
  ) {}

  @Post('add')
  @Roles('admin')
  @UseGuards(DirectorGuard)
  async add(
    @GetDirector() director: Director,
    @Query() { studyId, directorId }: MemberQueryDto,
    @Body() { role }: RoleDto,
  ) {
    await this.addMemberUseCase.execute({ studyId, directorId, role });
    return director;
  }

  @Post('changeRole')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(DirectorGuard, MemberGuard)
  async changeRole(
    @GetDirector() director: Director,
    @Query() { studyId, directorId }: MemberQueryDto,
    @Body() { role }: RoleDto,
  ) {
    await this.changeMemberRoleUseCase.execute({ studyId, directorId, role });
    return director;
  }

  @Post('remove')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(MemberGuard)
  async remove(@Query() { studyId, directorId }: MemberQueryDto) {
    await this.removeMemberUseCase.execute({ studyId, directorId });
  }
}

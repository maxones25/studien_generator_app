import {
  Body,
  Controller,
  Post,
  UseGuards,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UpdateDirectorDto } from '../dtos/UpdateDirectorDto';
import { DirectorGuard } from '../guards/director.guard';
import { Director } from '../decorators/director.decorator';
import { Director as DirectorEntity } from '@entities';
import { UpdatePasswordDto } from '../dtos/UpdatePasswordDto';
import { DeleteDto } from '@shared/modules/records/DeleteDto';
import { IsAdminGuard } from '../guards/IsAdminGuard';
import {
  CHANGE_PASSWORD_USE_CASE,
  DELETE_DIRECTOR_USE_CASE,
  IChangePasswordUseCase,
  IDeleteDirectorUseCase,
  IRestoreDirectorUseCase,
  IUpdateDirectorUseCase,
  RESTORE_DIRECTOR_USE_CASE,
  UPDATE_DIRECTOR_USE_CASE,
} from '@admin/directors/domain';

@Controller('directors')
export class DirectorsCommands {
  constructor(
    @Inject(RESTORE_DIRECTOR_USE_CASE)
    private readonly restoreDirectorUseCase: IRestoreDirectorUseCase,
    @Inject(CHANGE_PASSWORD_USE_CASE)
    private readonly changePasswordUseCase: IChangePasswordUseCase,
    @Inject(DELETE_DIRECTOR_USE_CASE)
    private readonly deleteDirectorUseCase: IDeleteDirectorUseCase,
    @Inject(UPDATE_DIRECTOR_USE_CASE)
    private readonly updateDirectorUseCase: IUpdateDirectorUseCase,
  ) {}

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async delete(
    @Director() director: DirectorEntity,
    @Body() { hardDelete }: DeleteDto,
  ) {
    return this.deleteDirectorUseCase.execute({
      directorId: director.id,
      hardDelete,
    });
  }

  @Post('restore')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async restore(@Director() director: DirectorEntity) {
    return this.restoreDirectorUseCase.execute({ directorId: director.id });
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async update(
    @Director() director: DirectorEntity,
    @Body() data: UpdateDirectorDto,
  ) {
    return this.updateDirectorUseCase.execute({
      directorId: director.id,
      data,
    });
  }

  @Post('resetPassword')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async updatePassword(
    @Director() director: DirectorEntity,
    @Body() { password }: UpdatePasswordDto,
  ) {
    return this.changePasswordUseCase.execute({
      directorId: director.id,
      password,
    });
  }
}

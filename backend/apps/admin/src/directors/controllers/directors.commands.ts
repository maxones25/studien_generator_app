import {
  Body,
  Controller,
  Post,
  UseGuards,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DirectorsService } from '../services/directors.service';
import { UpdateDirectorDto } from '../domain/dtos/UpdateDirectorDto';
import { DirectorGuard } from '../guards/director.guard';
import { Director } from '../decorators/director.decorator';
import { Director as DirectorEntity } from '@entities';
import { UpdatePasswordDto } from '../domain/dtos/UpdatePasswordDto';
import { DeleteDto } from '@shared/modules/records/DeleteDto';
import { IsAdminGuard } from '../guards/IsAdminGuard';

@Controller('directors')
export class DirectorsCommands {
  constructor(
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
  ) {}

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async delete(
    @Director() director: DirectorEntity,
    @Body() { hardDelete }: DeleteDto,
  ) {
    if (hardDelete) {
      return this.directorsService.hardDelete(director.id);
    } else {
      return this.directorsService.softDelete(director.id);
    }
  }

  @Post('restore')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async restore(@Director() director: DirectorEntity) {
    return this.directorsService.restore(director.id);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async update(
    @Director() director: DirectorEntity,
    @Body() body: UpdateDirectorDto,
  ) {
    return this.directorsService.update(director.id, body);
  }

  @Post('resetPassword')
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard, DirectorGuard)
  async updatePassword(
    @Director() director: DirectorEntity,
    @Body() { password }: UpdatePasswordDto,
  ) {
    return this.directorsService.changePassword(director.id, password);
  }
}

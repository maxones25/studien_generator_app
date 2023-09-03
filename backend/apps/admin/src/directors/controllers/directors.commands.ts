import {
  Body,
  Controller,
  Post,
  UseGuards,
  Inject,
  Query,
} from '@nestjs/common';
import { DirectorsService } from '../directors.service';
import { UpdateDirectorDto } from '../dtos/UpdateDirectorDto';
import { DirectorGuard } from '../guards/director.guard';
import { Director } from '../decorators/director.decorator';
import { Director as DirectorEntity } from '@entities';
import { UpdatePasswordDto } from '../dtos/UpdatePasswordDto';
import { DeleteDto } from '@shared/modules/records/DeleteDto';

@Controller('directors')
export class DirectorsCommands {
  constructor(
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
  ) {}

  @Post('delete')
  @UseGuards(DirectorGuard)
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
  @UseGuards(DirectorGuard)
  async restore(
    @Director() director: DirectorEntity,
  ) {
    return this.directorsService.restore(director.id);
  }

  @Post('update')
  @UseGuards(DirectorGuard)
  async update(
    @Director() director: DirectorEntity,
    @Body() body: UpdateDirectorDto,
  ) {
    return this.directorsService.update(director.id, body);
  }

  @Post('resetPassword')
  @UseGuards(DirectorGuard)
  async updatePassword(
    @Director() director: DirectorEntity,
    @Body() { password }: UpdatePasswordDto,
  ) {
    return this.directorsService.changePassword(director.id, password);
  }
}

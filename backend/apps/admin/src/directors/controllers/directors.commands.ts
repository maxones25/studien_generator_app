import { Body, Controller, Post, UseGuards, Inject } from '@nestjs/common';
import { DirectorsService } from '../directors.service';
import { UpdateDirectorDto } from '../dtos/UpdateDirectorDto';
import { DirectorGuard } from '../guards/director.guard';
import { Director } from '../decorators/director.decorator';
import { Director as DirectorEntity } from '@entities';

@Controller('directors')
export class DirectorsCommands {
  constructor(
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
  ) {}

  @Post('delete')
  @UseGuards(DirectorGuard)
  async delete(@Director() director: DirectorEntity) {
    return this.directorsService.delete(director.id);
  }

  @Post('update')
  @UseGuards(DirectorGuard)
  async update(
    @Director() director: DirectorEntity,
    @Body() body: UpdateDirectorDto,
  ) {
    return this.directorsService.update(director.id, body);
  }
}

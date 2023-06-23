import { Body, Controller, Delete, Get, Put, Request } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Types } from '../../decorators/type.decorator';
import { Director } from '../../entities/director.entity';
import { DirectorId } from '../../decorators/director-id.decorator';

@Controller('directors')
export class DirectorsController {
    constructor(private readonly directorsService: DirectorsService) {}

    @Types('director')
    @Get()
    async findAll() {
        return this.directorsService.findAll();
    }

    @Types('director')
    @Delete()
    async delete(@DirectorId() directorId: string) {
        return this.directorsService.delete(directorId);
    }

    @Types('director')
    @Put()
    async update(
        @DirectorId() directorId: string,
        @Body()updatedDirector: Partial<Director>,
        ) {
        return this.directorsService.update(directorId, updatedDirector)
    }
}


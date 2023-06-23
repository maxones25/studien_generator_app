import { Body, Controller, Delete, Get, Put, Request } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Types } from '../../decorators/type.decorator';
import { Director } from '../../entities/director.entity';

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
    async delete(@Request() req) {
        return this.directorsService.delete(req.payload.directorId);
    }

    @Types('director')
    @Put()
    async update(
        @Request() req,
        @Body()updatedDirector: Partial<Director>,
        ) {
        return this.directorsService.update(req.payload.directorId, updatedDirector)
    }
}


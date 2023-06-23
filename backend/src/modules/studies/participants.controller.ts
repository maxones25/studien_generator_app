import { Controller } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('directors')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {}


}

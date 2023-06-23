import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Types } from '../../decorators/type.decorator';

@Controller('studies')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {}

    @Types('director')
    @Get('groups/:groupId/participants/:participantNumber')
    async create(
        @Param('groupId') groupId: string,
        @Param('participantNumber') participantNumber: string
        ) {

    }

    @Types('director')
    @Get(':studyId/participants')
    async getParticipantsByStudy(@Param('studyId') studyId: string) {
        
    }

    @Types('director')
    @Get('groups/:groupId/participants')
    async getParticipantsByGroup(@Param('groupId') groupId: string) {
        
    }

    @Types('director')
    @Delete('participants/:participantId')
    async deleteParticipant(@Param('participantNumber') participantNumber: string) {

    }

}

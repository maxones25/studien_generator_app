import { Body, Controller, Put, Param, Post, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Types } from '../../decorators/type.decorator';
import { CreateStudyDto } from './dtos/createStudyDto';
import { Group } from '@entities';

@Controller('studies')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}


    @Types('director')
    @Post('/:studyId/groups')
    async create(
        @Param('studyId') studyId: string,
        @Body() createStudyDto: CreateStudyDto,
    ) {
        return this.groupsService.create(studyId, createStudyDto);
    }

    @Types('director')
    @Put('/:studyId/groups:groudId')
    async update(
        @Param('studyId') studyId: string,
        @Param('groupId') groupId: string,
        @Body() updateMember: Partial<Group>,
    ) {
        return this.groupsService.update(groupId, updateMember);
    }


}

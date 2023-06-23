import { Controller } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('directors')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}


}

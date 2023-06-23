import { Group } from "@entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStudyDto } from "./dtos/createStudyDto";

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Group)
        private groupsRepository: Repository<Group>,
    ) {}

    async create(studyId: string, { name }: CreateStudyDto) {
        await this.groupsRepository.insert({studyId, name});
    }

    async update(groupId: string, updatedGroup: Partial<Group>) {
        await this.groupsRepository.update({ id: groupId }, updatedGroup);
    }

}
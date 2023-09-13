import { Id } from "@shared/modules/core/Id";
import { CreateEntityDto } from "../dtos/CreateEntityDto";

export interface IEntitiesRepository {
    createEntity(studyId: string, data: CreateEntityDto): Promise<Id>;
}
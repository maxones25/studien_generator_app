import { Id } from "@shared/modules/core/Id";
import { CreateFieldDto } from "../dtos/CreateFieldDto";

export interface IFieldsRepository {
    createField(entityId: string, data: CreateFieldDto): Promise<Id>;

}
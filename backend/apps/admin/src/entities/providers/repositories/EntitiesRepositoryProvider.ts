import { ENTITIES_REPOSITORY } from "@admin/entities/domain";
import { EntitiesRepository } from "@admin/entities/infrastructure/db";
import { Provider } from "@nestjs/common";

export const EntitiesRepositoryProvider : Provider = {
    provide: ENTITIES_REPOSITORY,
    useClass: EntitiesRepository,
}
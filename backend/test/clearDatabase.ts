import { INestApplication } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";

export async function clearDatabase(app: INestApplication): Promise<void> {
    const entityManager = app.get<EntityManager>(EntityManager);
    const dataSource = app.get<DataSource>(DataSource);
    entityManager.connection.entityMetadatas
        .map(async (entity) => {
          const repository = dataSource.getRepository(entity.name);
          await repository.query('SET FOREIGN_KEY_CHECKS = 0');
          await repository.clear();
          await repository.query('SET FOREIGN_KEY_CHECKS = 1');
        });
}
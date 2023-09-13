import { Repository } from 'typeorm';
import { Entity } from '@entities';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntitiesRepository } from './domain/IEntitiesRepository';
import { CreateEntityDto } from './dtos/CreateEntityDto';

export class EntitiesRepository
  extends RecordRepository<Entity>
  implements IEntitiesRepository
{
  constructor(
    @InjectRepository(Entity)
    db: Repository<Entity>,
  ) {
    super(db);
  }

  async updateName(id: string, name: string): Promise<number> {
    const { affected } = await this.db.update({ id }, { name });
    return affected;
  }

  async createEntity(
    studyId: string,
    { name }: CreateEntityDto,
  ): Promise<string> {
    const entity = new Entity();

    entity.studyId = studyId;
    entity.name = name;

    await this.db.insert(entity);

    return entity.id;
  }

  getRelatedByStudy(studyId: string, id: string) {
    return this.db.findOne({
      where: {
        id,
        studyId,
      },
    });
  }

  getAll(studyId: string) {
    return this.db.find({
      where: {
        studyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getById(entityId: string) {
    return this.db.findOne({
      where: {
        id: entityId,
      },
      relations: {
        fields: true,
      },
      select: {
        id: true,
        name: true,
        fields: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }
}

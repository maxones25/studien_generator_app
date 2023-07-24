import { Repository } from 'typeorm';
import { Entity } from '../../entities/entity.entity';

export class EntitiesRepository extends Repository<Entity> {
  getAll(studyId: string) {
    return this.find({
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
    return this.findOne({
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

import { Group } from '@entities/group.entity';
import { Repository } from 'typeorm';

export class GroupsRepository extends Repository<Group> {
  async getByStudy(studyId: string) {
    return this.find({
      where: { studyId },
      select: {
        id: true,
        name: true,
      },
      order: { name: 'ASC' },
    });
  }

  async getById(id: string) {
    return this.findOneOrFail({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }
}

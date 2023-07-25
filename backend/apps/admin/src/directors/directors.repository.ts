import { Director } from '@entities/director.entity';
import { Repository } from 'typeorm';

export class DirectorsRepository extends Repository<Director> {
  async getAll() {
    return this.find({
      select: { id: true, firstName: true, lastName: true, email: true },
    });
  }

  async getByEmail(email: string) {
    return this.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      }
    });
  }
}

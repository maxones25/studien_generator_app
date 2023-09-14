import { StudyMember } from '@entities';
import { Director } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IDirectorsRepository } from '../domain/repositories/IDirectorsRepository';
import { SignupDirectorDto } from '../domain/dtos/SignupDirectorDto';
import { UpdateDirectorDto } from '../domain/dtos/UpdateDirectorDto';
import { RecordRepository2 } from '@shared/modules/records/record.repository';
import { CreateDirectorDto } from '../domain/dtos/CreateDirectorDto';

export class DirectorsRepository
  extends RecordRepository2<Director>
  implements IDirectorsRepository
{
  constructor(
    @InjectRepository(Director)
    db: Repository<Director>,
  ) {
    super(db);
  }

  async update(
    directorId: string,
    { email, firstName, lastName }: UpdateDirectorDto,
  ) {
    return this.updateRecord(directorId, { email, firstName, lastName });
  }

  restore(directorId: string) {
    return this.restoreRecord(directorId);
  }

  softDelete(directorId: string) {
    return this.softDeleteRecord(directorId);
  }

  hardDelete(directorId: string) {
    return this.hardDeleteRecord(directorId);
  }
  isDeleted(directorId: string) {
    return this.isDeletedRecord(directorId);
  }

  async create({
    email,
    password,
    firstName,
    lastName,
  }: CreateDirectorDto): Promise<string> {
    const director = await this.createRecord({
      email,
      password,
      firstName,
      lastName,
    });

    return director.id;
  }

  getByCredentials(email: string, password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string) {
    return await this.db.findOne({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  }

  async getByEmail(email: string, deleted = false) {
    const deletedAt = deleted ? undefined : IsNull();
    return this.db.findOne({
      where: {
        email,
        deletedAt,
      },
      select: {
        id: true,
        password: true,
      },
    });
  }

  get() {
    return this.db.find({
      select: {
        id: true,
        deletedAt: true,
        createdAt: true,
        modifiedAt: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async getStudyMembers(studyId: string) {
    return this.db.find({
      where: {
        studies: {
          studyId,
        },
      },
      select: { id: true, firstName: true, lastName: true, email: true },
    });
  }

  async getNonStudyMembers(studyId: string) {
    return this.db
      .createQueryBuilder('d')
      .select(['d.id', 'd.firstName', 'd.lastName', 'd.email'])
      .leftJoin(
        StudyMember,
        'sm',
        'd.id = sm.directorId AND sm.studyId = :studyId',
        { studyId },
      )
      .where('sm.studyId IS NULL')
      .groupBy('d.id')
      .getMany();
  }

  changePassword(id: string, password: string) {
    return this.updateRecord(id, { password });
  }
}

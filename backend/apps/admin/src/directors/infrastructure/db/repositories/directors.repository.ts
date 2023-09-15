import {
  StudyMemberSchema,
  Director as DirectorSchema,
} from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  CreateDirectorDto,
  IDirectorsRepository,
  UpdateDirectorDto,
} from '@admin/directors/domain';
import { RecordRepository2 } from '@shared/modules/records/record.repository';

export class DirectorsRepository
  extends RecordRepository2<DirectorSchema>
  implements IDirectorsRepository
{
  constructor(
    @InjectRepository(DirectorSchema)
    db: Repository<DirectorSchema>,
  ) {
    super(db);
  }

  async restore(directorId: string): Promise<number> {
    return this.restoreRecord(directorId);
  }

  async update(
    directorId: string,
    { email, firstName, lastName }: UpdateDirectorDto,
  ) {
    return this.updateRecord(directorId, { email, firstName, lastName });
  }

  async softDelete(directorId: string) {
    return this.softDeleteRecord(directorId);
  }

  async hardDelete(directorId: string) {
    return this.hardDeleteRecord(directorId);
  }
  async isDeleted(directorId: string) {
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
        StudyMemberSchema,
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

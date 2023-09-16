import {
  StudyMemberSchema,
  Director as DirectorSchema,
} from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IDirectorsRepository, Director } from '@admin/directors/domain';
import { Id } from '@shared/modules/core';
import { TypeOrmRepository } from '@shared/modules/db';

export class DirectorsRepository
  extends TypeOrmRepository<DirectorSchema>
  implements IDirectorsRepository
{
  constructor(
    @InjectRepository(DirectorSchema)
    db: Repository<DirectorSchema>,
  ) {
    super(db);
  }

  async create({
    email,
    password,
    firstName,
    lastName,
  }: Director): Promise<string> {
    const director = await this.createRecord({
      email,
      password,
      firstName,
      lastName,
    });

    return director.id;
  }

  async getAll(): Promise<Director[]> {
    return this.db.find({
      select: {
        id: true,
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async getStudyMembers(studyId: Id) {
    return this.db.find({
      where: {
        studies: {
          studyId,
        },
      },
      select: {
        id: true,
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async getNonMembersOfStudy(studyId: Id) {
    return this.db
      .createQueryBuilder('d')
      .select([
        'd.id',
        'd.createdAt',
        'd.modifiedAt',
        'd.deletedAt',
        'd.email',
        'd.firstName',
        'd.lastName',
      ])
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

  async getById(id: Id) {
    return await this.db.findOne({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async getCredentialsByEmail(email: string) {
    return this.db.findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
      select: {
        id: true,
        password: true,
      },
    });
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    const director = await this.db.findOne({
      where: {
        email,
      },
    });
    return director !== null;
  }

  async isDeleted(directorId: Id) {
    return this.isDeletedRecord(directorId);
  }

  async update({ id, email, firstName, lastName }: Director) {
    return this.updateRecord(id, { email, firstName, lastName });
  }

  async restore(directorId: Id): Promise<number> {
    return this.restoreRecord(directorId);
  }

  async softDelete(directorId: Id) {
    return this.softDeleteRecord(directorId);
  }

  async hardDelete(directorId: Id) {
    return this.hardDeleteRecord(directorId);
  }

  async changePassword({ id, password }: Director) {
    return this.updateRecord(id, { password });
  }
}

import { FormConfiguration as FormConfigurationSchema } from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFormConfigsRepository } from '@admin/Groups/domain';
import { TypeOrmRepository } from '@shared/modules/db';

export class FormConfigsRepository implements IFormConfigsRepository {
  private readonly db: TypeOrmRepository<FormConfigurationSchema>;

  constructor(
    @InjectRepository(FormConfigurationSchema)
    db: Repository<FormConfigurationSchema>,
  ) {
    this.db = new TypeOrmRepository<FormConfigurationSchema>(db);
  }
  
  hardDelete(options: { groupId?: string }): Promise<number> {
    return this.db.hardDelete(options);
  }

  softDelete(options: { groupId?: string }): Promise<number> {
    return this.db.softDelete(options);
  }
}

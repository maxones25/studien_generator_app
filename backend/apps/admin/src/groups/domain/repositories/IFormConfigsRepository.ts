import { DeletedResult } from '@shared/modules/core';

export const FORM_CONFIGS_REPOSITORY = 'FORM_CONFIGS_REPOSITORY';

export interface IFormConfigsRepository {
  hardDelete(options: { groupId?: string }): Promise<DeletedResult>;
  softDelete(options: { groupId?: string }): Promise<DeletedResult>;
}

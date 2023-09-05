import { ValueObject } from "./ValueObject";

export type CreateEntityDto<T extends ValueObject> = Omit<
  T,
  'id' | 'createdAt' | 'modifiedAt' | 'deletedAt' | 'isDeleted'
>;

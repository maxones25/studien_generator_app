import { ValueObject } from "./ValueObject";

export type CreateDto<T extends ValueObject> = Omit<
  T,
  'id' | 'createdAt' | 'modifiedAt' | 'deletedAt' | 'isDeleted'
>;

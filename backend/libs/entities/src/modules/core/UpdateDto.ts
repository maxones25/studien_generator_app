import { CreateDto } from './CreateEntityDto';
import { ValueObject } from './ValueObject';

export type UpdateDto<T extends ValueObject> = Partial<CreateDto<T>>;

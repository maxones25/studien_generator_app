import {
  AttributeKey,
  Attributes,
} from '@shared/modules/records/attribute.repository';

export type BaseAttribute<T extends Attributes> = {
  key: AttributeKey<T>;
  value: any;
};

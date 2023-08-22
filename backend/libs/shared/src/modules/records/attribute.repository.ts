export type Attributes = Record<string, any>;

export type AttributeKey<RecordAttributes extends Attributes> =
  keyof RecordAttributes;

export type AttributeValue<
  RecordAttributes extends Attributes,
  Key extends AttributeKey<RecordAttributes>,
> = RecordAttributes[Key];

export interface AttritbuteRepository<
  RecordAttributes extends Record<string, any>,
> {
  get<Key extends AttributeKey<RecordAttributes>>(
    id: string,
    key: Key,
  ): Promise<AttributeValue<RecordAttributes, Key>>;

  set<Key extends AttributeKey<RecordAttributes>>(
    id: string,
    key: Key,
    rawValue: AttributeValue<RecordAttributes, Key>,
  ): Promise<void>;

  remove<Key extends AttributeKey<RecordAttributes>>(
    id: string,
    key: Key,
  ): Promise<number>;

  isSet(id: string, key: AttributeKey<RecordAttributes>): Promise<boolean>;

  getAll(id: string): Promise<RecordAttributes>;

  removeAll(
    id: string,
  ): Promise<number>;
}

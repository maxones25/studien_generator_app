import { FieldType } from "@modules/fields/types";

export type RecordForm = {
  id: string;
  name: string;
};

export type RecordTask = {
  id: string;
  scheduledAt: string;
  completedAt: string;
};

export type RecordParticipant = {
  id: string;
  number: string;
  group: RecordGroup;
};

export type RecordGroup = {
  id: string;
  name: string;
};

export type RecordEntity = {
  id: string;
  name: string;
};

export type RecordEntityField = {
  id: string;
  name: string;
  type: FieldType;
};

export type RecordField = {
  id: string;
  value: any;
  entity: RecordEntity;
  field: RecordEntityField;
};

export type Record = {
  id: string;
  createdAt: string;
  isFailed: boolean;
  failureReason: string | null;
  form: RecordForm;
  task: RecordTask | null;
  participant: RecordParticipant;
  fields: globalThis.Record<string, RecordField>;
};

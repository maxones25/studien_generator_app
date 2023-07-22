export type Record = {
  taskId?: string;
  createdAt: Date;
  formId: string;
  fields: RecordField[];
}

export type RecordField = {
  entityFieldId: string;
  value: string | boolean | number | Date;
}

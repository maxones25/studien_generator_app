export type Record = {
  id: string;
  taskId?: string;
  createdAt: Date;
  formId: string;
  name: string;
  fields: RecordField[];
}

export type RecordField = {
  entityFieldId: string;
  value: any;
}

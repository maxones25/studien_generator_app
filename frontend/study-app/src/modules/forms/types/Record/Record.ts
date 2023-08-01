export type Record = {
  id: string;
  taskId?: string;
  createdAt: Date;
  formId: string;
  fields: RecordField[];
  name: string
}

export type RecordField = {
  entityFieldId: string;
  value: any;
}

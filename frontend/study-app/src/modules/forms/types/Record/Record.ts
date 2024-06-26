export type Record = {
  id: string;
  taskId?: string;
  createdAt: Date;
  formId: string;
  failureReason?: string;
  fields: RecordField[];
  name: string
}

export type RecordField = {
  formFieldId: string;
  value: any;
}

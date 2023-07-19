export type Record = {
  taskId?: string;
  completedAt: Date;
  formId: string;
  fields: RecordField[];
}

export type RecordField = {
  id: string;
  value: string | boolean | number | Date;
}

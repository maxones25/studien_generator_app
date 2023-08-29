export const FieldTypeMap = {
  DateTime: "DateTime",
  Time: "Time",
  Date: "Date",
  Text: "Text",
  Number: "Number",
  Boolean: "Boolean",
} as const;

export type FieldType = (typeof FieldTypeMap)[keyof typeof FieldTypeMap];

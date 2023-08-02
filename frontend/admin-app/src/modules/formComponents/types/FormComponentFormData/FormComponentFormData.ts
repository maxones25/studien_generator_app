export type FormComponentFormData = {
  id?: string;
  type: string;
  formFields: {
    entityId: string;
    fieldId: string;
  }[];
  attributes: Record<string, any>;
};

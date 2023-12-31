export type FormComponent = {
  id: string;
  type: string;
  formFields: {
    entityId: string;
    fieldId: string;
  }[];
  attributes: Record<string, any>;
};

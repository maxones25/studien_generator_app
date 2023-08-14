import { FormConfigTypeType } from "@modules/forms/types";

export type FormConfigFormData = {
  formId: string;
  groupId: string;
  isActive: boolean;
  type: FormConfigTypeType;
};

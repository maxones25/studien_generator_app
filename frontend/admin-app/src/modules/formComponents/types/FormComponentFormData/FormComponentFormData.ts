import { FormComponent } from "..";

export type FormComponentFormData = {
  id?: string;
  type: string;
  formFields: {
    entityId: string;
    fieldId: string;
  }[];
  attributes: Record<string, any>;
};

export type FormComponentsSequence = {
  components: FormComponent[],
}

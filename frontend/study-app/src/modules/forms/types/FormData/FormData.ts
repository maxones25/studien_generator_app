export type FormConfig = {
  id: string;
  type: FormType;
  form: FormData;
};

export enum FormType {
  TimeIndependent = "TimeIndependent",
  TimeDependent = "TimeDependent",
}

export type FormData = {
  id: string;
  name: string;
  pages: FormPageData[];
};

export type FormPageData = {
  components: FormComponentData[];
};

export type FormComponentData = {
  type: string;
  id: string;
  formFields: FormField[];
  attributes: FormComponentDataAttribute[];
};

export type FormComponentDataAttribute = {
  key: string;
  value: any;
};

export type FormField = {
  id: string;
  entityField: {
    id: string,
    name: string,
  }
};

export type FormComponentDataAttributes = {
  label?: string;
  options?: any[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: any;
  step?: number;
  required?: boolean;
};

export type FormComponentDataRules = {
  reqired?: string;
  minLength?: number;
  maxLength?: number;
};

export const findFormField = (
  form: FormData,
  fieldId: string
): FormField | undefined => {
  // Durchlaufen aller Seiten des Formulars
  for (const page of form.pages) {
    // Durchlaufen aller Komponenten auf der aktuellen Seite
    for (const component of page.components) {
      // Durchlaufen aller Felder in der aktuellen Komponente
      const foundField = component.formFields.find(field => field.id === fieldId);
      if (foundField) {
        // Rückgabe des gefundenen Feldes
        return foundField;
      }
    }
  }
  // Wenn das Feld in keiner Komponente gefunden wurde, Rückgabe von undefined
  return undefined;
};
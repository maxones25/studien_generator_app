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

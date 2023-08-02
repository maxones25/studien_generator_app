export type FormConfig = {
  id: string,
  type: FormType,
  form: FormData,
}

export type FormData = {
  id: string,
  name: string,
  pages: FormPageData[],
}

export enum FormType {
  TimeIndependent = 'TimeIndependent',
  TimeDependent = 'TimeDependent'
}

export type FormPageData = {
  components: FormComponentData[],
}

export type FormComponentData = {
  type: string,
  id: string,
  formFields: FormField[],
  attributes: FormComponentDataAttribute[],
}

export type FormComponentDataAttribute = {
  key: string,
  value: any,
}

export type FormField = {
  entityFieldId: string;
}

export type FormComponentDataAttributes = {
  label?: string,
  options?: any[],
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  defaultValue?: any,
}

export type FormComponentDataRules = {
  reqired?: string,
  minLength?: number,
  maxLength?: number,
}


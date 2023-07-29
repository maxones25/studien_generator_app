export type FormData = {
  id: string,
  name: string,
  pages: FormPageData[],
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
  max?: number
}

export type FormComponentDataRules = {
  reqired?: string,
  minLength?: number,
  maxLength?: number,
}


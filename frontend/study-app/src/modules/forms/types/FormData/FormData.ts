export type FormData = {
  id: string,
  name: string,
  pages: FormPageData[],
}

export type FormPageData = {
  title: string,
  components: FormComponentData[],
}

export type FormComponentData = {
  type: string,
  formFields: FormField[],
  attributes?: FormComponentDataAttributes,
}

export type FormComponentDataAttributes = {
  label?: string,
  options?: any[],
  min?: number,
  max?: number
}

export type FormField = {
  entityFieldId: string;
}
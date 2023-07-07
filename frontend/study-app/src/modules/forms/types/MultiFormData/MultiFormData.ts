export type MultiFormData = {
  title: string,
  pages: FormData[],
}

export type FormData = {
  name: string,
  fields: FormFieldData[],
}

export type FormFieldData = {
  type: string,
  name: string,
}
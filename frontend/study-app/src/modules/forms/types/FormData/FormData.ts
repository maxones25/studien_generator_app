import { FormSelectOption } from "@modules/core/components"

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
  id: string
  type: string,
  label: string,
  attributes?: FormComponentDataAttributes,
}

export type FormComponentDataAttributes = {
  options?: FormSelectOption[],
  min?: number,
  max?: number
}
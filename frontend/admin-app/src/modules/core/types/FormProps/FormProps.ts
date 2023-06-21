import { FormProps as FormComponentProps } from "@modules/core/components";

export interface FormProps<FormData> {
  onSubmit: (data: FormData) => void;
  values?: FormData;
  defaultValues?: Partial<FormData>;
  isError?: boolean;
  formProps?: FormComponentProps;
}

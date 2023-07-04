import { FormProps as FormComponentProps } from "@modules/core/components";

export interface FormProps<FormData> {
  onSubmit: (data: FormData) => void;
  values?: FormData;
  isError?: boolean;
  isLoading?: boolean;
  isNew?: boolean;
  formProps?: FormComponentProps;
}

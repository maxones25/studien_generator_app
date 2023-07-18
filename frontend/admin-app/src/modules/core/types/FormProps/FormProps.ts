import { FormProps as FormComponentProps } from "@modules/core/components";
import { FieldValues } from "react-hook-form";

export interface FormProps<
  SubmitData extends FieldValues,
  FormData extends FieldValues = SubmitData
> {
  onSubmit: (data: SubmitData) => void;
  values?: SubmitData;
  isError?: boolean;
  isLoading?: boolean;
  isNew?: boolean;
  formProps?: FormComponentProps<FormData>;
}

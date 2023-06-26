import { FormTextField, FormTextFieldProps } from "..";
import { FieldValues } from "react-hook-form";

export interface FormEmailFieldProps<FormData extends FieldValues>
  extends FormTextFieldProps<FormData> {}

export const FormEmailField = <FormData extends FieldValues>(
  props: FormEmailFieldProps<FormData>
) => {
  return <FormTextField {...props} type="email" />;
};

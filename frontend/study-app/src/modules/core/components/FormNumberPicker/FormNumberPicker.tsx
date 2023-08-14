import { FormTextField, FormTextFieldProps } from '..';
import { FieldValues } from 'react-hook-form';

export interface FormNumberPickerProps<FormData extends FieldValues>
extends FormTextFieldProps<FormData> {}

export const FormNumberPicker = <FormData extends FieldValues>(
  props: FormNumberPickerProps<FormData>
) => {
  return <FormTextField {...props} type="number" />;
};
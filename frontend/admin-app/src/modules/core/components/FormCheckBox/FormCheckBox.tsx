import { Checkbox, FormControlLabel } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

export interface FormCheckBoxProps<TFieldValues extends FieldValues> {
  label?: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
export const FormCheckBox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
}: FormCheckBoxProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormControlLabel control={<Checkbox {...field} />} label={label} />
      )}
    />
  );
};

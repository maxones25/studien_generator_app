import { Checkbox, FormControlLabel } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";

export interface FormCheckBoxProps<TFieldValues extends FieldValues> {
  label?: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;

  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
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
  defaultValue,
}: FormCheckBoxProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, ...field } }) => (
        <FormControlLabel
          control={<Checkbox data-testid={`change ${name}`} {...field} />}
          label={label}
          checked={value}
        />
      )}
    />
  );
};

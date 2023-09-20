import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { Switch } from "..";

export interface FormSwitchProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export function FormSwitch<TFieldValues extends FieldValues>({
  label,
  control,
  name,
  rules,
}: FormSwitchProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => <Switch testId={`change ${name}`} label={label} {...field} />}
    />
  );
}

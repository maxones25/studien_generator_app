import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { Switch } from "..";
import { FormControl, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormComponentDataAttributes } from "@modules/forms/types";

export interface FormSwitchProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  attributes?: FormComponentDataAttributes;
}

export function FormSwitch<TFieldValues extends FieldValues>({
  label,
  control,
  name,
  rules,
  attributes
}: FormSwitchProps<TFieldValues>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState }) => (
        <FormControl 
        margin="normal"
        error={Boolean(formState.errors[name])}
        >
          <Switch 
            {...field}
            {...attributes} 
            label={label}
          />
          {Boolean(formState.errors[name]) && 
            <FormHelperText>{t("value required")}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

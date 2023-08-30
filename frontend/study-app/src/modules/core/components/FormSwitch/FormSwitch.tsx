import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  Path,
  get,
} from "react-hook-form";
import { Switch } from "..";
import { FormControl, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormComponentDataAttributes } from "@modules/forms/types";

export interface FormSwitchProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  componentId: string;
  formFieldId: string;
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
  componentId,
  formFieldId,
  rules,
  attributes
}: FormSwitchProps<TFieldValues>) {
  const { t } = useTranslation();
  const name: Path<TFieldValues> = `${componentId}.${formFieldId}` as Path<TFieldValues>


  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState }) => {
        const error = get(formState.errors, name);
        
        return (
        <FormControl 
        margin="normal"
        error={error}
        >
          <Switch 
            {...field}
            {...attributes} 
            label={label}
          />
          {Boolean(error) && 
            <FormHelperText>{t("value required")}</FormHelperText>}
        </FormControl>
      )}}
    />
  );
}

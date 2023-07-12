import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { Row, Switch } from "..";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

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
          <Row>
            <Switch 
              {...field} 
              label={label}/>
          </Row>
          {Boolean(formState.errors[name]) && 
            <FormHelperText>{t("value required")}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

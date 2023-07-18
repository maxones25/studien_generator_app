import { FormComponentDataAttributes } from "@modules/forms/types";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormCheckBoxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label?: string;
  attributes?: FormComponentDataAttributes;
}

export function FormCheckBox<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  label,
  attributes,
}: FormCheckBoxProps<TFieldValues>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, value, ...field }, formState }) => (
        <FormControl 
          margin="normal"
          error={Boolean(formState.errors[name])}
        > 
          <FormControlLabel 
            label={label} 
            control={
              <Checkbox 
                onChange={(_e, checked) => {
                  onChange(checked as PathValue<TFieldValues, Path<TFieldValues>>);
                }}
                {...field}
                {...attributes}
              />
            }
          />
          {Boolean(formState.errors[name]) && <FormHelperText>{t("value required")}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
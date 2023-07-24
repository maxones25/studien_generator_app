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
  get,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormCheckBoxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  componentId: string;
  entityFieldId: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label?: string;
  attributes?: FormComponentDataAttributes;
}

export function FormCheckBox<TFieldValues extends FieldValues>({
  control,
  componentId,
  entityFieldId,
  rules,
  label,
  attributes,
}: FormCheckBoxProps<TFieldValues>) {
  const { t } = useTranslation();
  const name: Path<TFieldValues> = `${componentId}.${entityFieldId}` as Path<TFieldValues>
  

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, value, ...field }, formState }) => {
        const error = get(formState.errors, name);
        return(
        <FormControl 
          margin="normal"
          error={Boolean(error)}
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
          {Boolean(error) && <FormHelperText>{t("value required")}</FormHelperText>}
        </FormControl>
      )}}
    />
  );
}
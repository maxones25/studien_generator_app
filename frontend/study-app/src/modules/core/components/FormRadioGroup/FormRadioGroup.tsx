import { FormComponentDataAttributes } from "@modules/forms/types";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  SxProps,
  Theme,
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

export interface FormRadioGroupProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  componentId: string;
  entityFieldId: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
  label?: string;
  attributes?: FormComponentDataAttributes;
}

export function FormRadioGroup<TFieldValues extends FieldValues>({
  control,
  componentId,
  entityFieldId,
  rules,
  label,
  sx,
  attributes,
}: FormRadioGroupProps<TFieldValues>) {
  const { t } = useTranslation();
  const name: Path<TFieldValues> = `${componentId}.${entityFieldId}` as Path<TFieldValues>

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, value, ...field }, formState }) => {
        const error = get(formState.errors, name);
        
        return (
        <FormControl 
          margin="normal"
          error={error}
        >
          <FormLabel error={error} id={name}>{label}</FormLabel>
          <RadioGroup
            sx={sx}
            value={value ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              onChange(value as PathValue<TFieldValues, Path<TFieldValues>>);
            }}
            {...field}
          >
            {attributes?.options?.map((option) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
          {Boolean(error) && <FormHelperText>{t("value required")}</FormHelperText>}
        </FormControl>
      )}}
    />
  );
};
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
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
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type FormSelectOption = {
  label: string;
  value: string;
};

export interface FormSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: FormSelectOption[];
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
  label?: string;
}

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  name,
  options,
  rules,
  size,
  label,
  sx,
}: FormSelectProps<TFieldValues>) {
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
          {label && <InputLabel id={`${name}-select`}>{label}</InputLabel>}
          <Select
            sx={sx}
            size={size}
            labelId={`${name}-select`}
            label={label}
            value={value ?? ''}
            error={Boolean(formState.errors[name])}
            onChange={(e) => {
              const value = e.target.value;
              onChange(value as PathValue<TFieldValues, Path<TFieldValues>>);
            }}
            {...field}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {Boolean(formState.errors[name]) && <FormHelperText>{t("value required")}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

import { FormComponentDataAttributes } from "@modules/forms/types";
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
  get,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  componentId: string;
  formFieldId: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
  label?: string;
  attributes?: FormComponentDataAttributes;
}

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  componentId,
  formFieldId,
  rules,
  size,
  label,
  sx,
  attributes,
}: FormSelectProps<TFieldValues>) {
  const { t } = useTranslation();

  const name: Path<TFieldValues> =
    `${componentId}.${formFieldId}` as Path<TFieldValues>;

  return (
    <Controller
      control={control}
      rules={rules}
      defaultValue={attributes?.defaultValue}
      name={name}
      render={({ field: { onChange, value, ...field }, formState }) => {
        const error = get(formState.errors, name);

        return (
          <FormControl margin="normal" error={error}>
            {label && <InputLabel id={`${name}-select`}>{label}</InputLabel>}
            <Select
              sx={sx}
              size={size}
              labelId={`${name}-select`}
              label={label}
              value={value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value as PathValue<TFieldValues, Path<TFieldValues>>);
              }}
              {...field}
            >
              {attributes?.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {Boolean(error) && (
              <FormHelperText>{t("required")}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}

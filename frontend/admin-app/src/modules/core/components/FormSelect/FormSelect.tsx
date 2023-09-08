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

  testId?: string;
}

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  name,
  testId = `change ${name}`,
  options,
  rules,
  size,
  label,
  sx,
}: FormSelectProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, ...field }, formState: { errors } }) => {
        const error = get(errors, name);
        const isError = Boolean(error);
        return (
          <FormControl margin="normal">
            {label && <InputLabel id={`${name}-select`}>{label}</InputLabel>}
            <Select
              sx={sx}
              size={size}
              labelId={`${name}-select`}
              label={label}
              data-testid={testId}
              error={isError}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value as PathValue<TFieldValues, Path<TFieldValues>>);
              }}
              {...field}
            >
              {options.map((option,) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  data-testid={`${testId} option ${option.value}`}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={isError}>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}

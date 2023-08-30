import { Autocomplete, Chip, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  get,
} from "react-hook-form";

export interface FormTagsFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label?: string;
}

export const FormTagsField = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  label,
}: FormTagsFieldProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, ...field }, formState: { errors } }) => {
        const error = get(errors, name);

        return (
          <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            onChange={(_, values) => {
              onChange(values);
            }}
            freeSolo
            value={field.value}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  {...field}
                  label={label}
                  multiline
                  margin="normal"
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              );
            }}
          />
        );
      }}
    />
  );
};

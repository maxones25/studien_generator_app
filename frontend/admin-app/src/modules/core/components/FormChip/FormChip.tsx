import { Chip } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

export interface FormChipProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  convertChange: (
    value: PathValue<TFieldValues, Path<TFieldValues>>
  ) => PathValue<TFieldValues, Path<TFieldValues>>;
}

export function FormChip<TFieldValues extends FieldValues>({
  control,
  label,
  name,
  convertChange,
}: FormChipProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <>
          <Chip
            size="small"
            color="primary"
            label={label}
            sx={{ m: 0.5, width: 40 }}
            onClick={() => {
              onChange(convertChange(value));
            }}
          />
          <input type="hidden" {...field} />
        </>
      )}
    />
  );
}

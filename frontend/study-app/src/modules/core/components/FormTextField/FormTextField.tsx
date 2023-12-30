import { FormComponentDataAttributes } from "@modules/forms/types";
import { TextFieldProps, TextField, SxProps, Theme } from "@mui/material";
import { Control, Controller, FieldValues, FormState, Path, get } from "react-hook-form";

export interface FormTextFieldProps<FormData extends FieldValues> {
  control: Control<FormData>;
  formState: FormState<FormData>;
  textFieldProps: TextFieldProps;
  sx?: SxProps<Theme>;
  isVisible?: boolean;
  label?: React.ReactNode;
  type?: React.InputHTMLAttributes<unknown>["type"];
  fullWidth?: boolean;
  placeholder?: string;
  attributes?: FormComponentDataAttributes
}

export const FormTextField = <FormData extends FieldValues>({
  formState,
  textFieldProps,
  label,
  sx,
  placeholder,
  type = "text",
  isVisible = true,
  fullWidth = false,
  control,
}: FormTextFieldProps<FormData>) => {
  const { name, inputProps } = textFieldProps;
  const error = get(formState.errors, name);


  if (!name) throw new Error("name required");

  return isVisible ? (
  <Controller
      control={control}
      name={name as Path<FormData>}
      render={({ field }) => (
        <TextField
          {...field}
          sx={sx}
          error={Boolean(error)}
          margin="normal"
          helperText={error?.message?.toString() ?? null}
          label={label}
          type={type}
          fullWidth={fullWidth}
          placeholder={placeholder}
          inputProps={{
            ...inputProps,
            "data-testid": `${name}-input`,
          }}
          InputLabelProps={{ shrink: Boolean(field.value) }}
          FormHelperTextProps={{
            //@ts-ignore
            "data-testid": `${name}-input-helper-text`,
          }}
        />
      )}
    />
  ) : null;
};

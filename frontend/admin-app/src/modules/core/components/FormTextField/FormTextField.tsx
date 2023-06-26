import { TextFieldProps, TextField, SxProps, Theme } from "@mui/material";
import { FieldValues, FormState } from "react-hook-form";

export interface FormTextFieldProps<FormData extends FieldValues> {
  formState: FormState<FormData>;
  textFieldProps: TextFieldProps;
  sx?: SxProps<Theme>;
  isVisible?: boolean;
  label?: React.ReactNode;
  type?: React.InputHTMLAttributes<unknown>["type"];
  fullWidth?: boolean;
}

export const FormTextField = <FormData extends FieldValues>({
  formState,
  textFieldProps,
  label,
  sx,
  type = "text",
  isVisible = true,
  fullWidth = false,
}: FormTextFieldProps<FormData>) => {
  const { name, inputProps } = textFieldProps;

  if (!name) throw new Error("name required");

  return isVisible ? (
    <TextField
      sx={sx}
      error={Boolean(formState.errors[name])}
      margin="normal"
      helperText={formState.errors[name]?.message?.toString() ?? null}
      label={label}
      type={type}
      fullWidth={fullWidth}
      inputProps={{
        ...inputProps,
        "data-testid": `${name}-input`,
      }}
      FormHelperTextProps={{
        // @ts-ignore
        "data-testid": `${name}-input-helper-text`,
      }}
      {...textFieldProps}
    />
  ) : null;
};

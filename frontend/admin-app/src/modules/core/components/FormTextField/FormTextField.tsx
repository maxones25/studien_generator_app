import { TextFieldProps, TextField } from "@mui/material";
import { FieldValues, FormState } from "react-hook-form";

export interface FormTextFieldProps<FormData extends FieldValues> {
  formState: FormState<FormData>;
  textFieldProps: TextFieldProps;
  isVisible?: boolean;
  label?: React.ReactNode;
  type?: React.InputHTMLAttributes<unknown>["type"];
}

export const FormTextField = <FormData extends FieldValues>({
  formState,
  textFieldProps,
  isVisible = true,
  type = "text",
  label,
}: FormTextFieldProps<FormData>) => {
  const { name, inputProps } = textFieldProps;

  if (!name) throw new Error("name required");

  return isVisible ? (
    <TextField
      error={Boolean(formState.errors[name])}
      margin="normal"
      helperText={formState.errors[name]?.message?.toString() ?? null}
      label={label}
      type={type}
      inputProps={{
        ...inputProps,
        "data-testid": `${name}-input`,
      }}
      FormHelperTextProps={{
        // @ts-ignore
        "data-testid": `${name}-input-helper-text`
      }}
      {...textFieldProps}
    />
  ) : null;
};

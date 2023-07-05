import { FieldValues } from "react-hook-form";
import { InputAdornment, IconButton } from "@mui/material";
import { FormTextField, FormTextFieldProps } from "..";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export interface FormPasswordFieldProps<FormData extends FieldValues>
  extends FormTextFieldProps<FormData> {}

export const FormPasswordField = <FormData extends FieldValues>({
  textFieldProps,
  ...props
}: FormPasswordFieldProps<FormData>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <FormTextField
      {...props}
      textFieldProps={{
        ...textFieldProps,
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      type={showPassword ? "text" : "password"}
    />
  );
};

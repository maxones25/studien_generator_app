import { FormComponentDataAttributes } from "@modules/forms/types";
import { TextFieldProps, TextField, SxProps, Theme, Box } from "@mui/material";
import { Control, Controller, FieldValues, FormState, Path, get } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text } from "..";

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
  attributes,
}: FormTextFieldProps<FormData>) => {
  const { name, inputProps } = textFieldProps;
  const error = get(formState.errors, name);
  const labelLength = label?.toString().length ?? 0;
  const { t } = useTranslation();
  const maxLength = 20;


  if (!name) throw new Error("name required");

  return isVisible ? (
  <Controller
      control={control}
      name={name as Path<FormData>}
      defaultValue={attributes?.defaultValue}
      render={({ field }) => (
        <Box>
          {labelLength > maxLength && <Text>{label}</Text>}
          <TextField
            {...field}
            sx={{...sx, width: '100%'}}
            error={Boolean(error)}
            margin="normal"
            helperText={error?.message?.toString() ?? null}
            label={labelLength <= maxLength ? label : ''}
            type={type}
            fullWidth={fullWidth}
            placeholder={placeholder ?? t('answer')}
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
        </Box>
      )}
    />
  ) : null;
};

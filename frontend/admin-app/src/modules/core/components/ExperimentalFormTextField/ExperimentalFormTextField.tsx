import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldPath,
  FieldValue,
  FieldValues,
  UseFormReturn,
  Validate,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type ExperimentalFormTextFieldProps<
  FormData extends FieldValues,
  FieldName extends FieldPath<FormData>
> = {
  name: FieldName;
  form: UseFormReturn<FormData>;
  required?: boolean | string;
  maxLength?: number;
  minLength?: number;
  equals?: Validate<FieldValue<FormData>, FormData>;
  validate?: Record<string, Validate<FieldValue<FormData>, FormData>>;
  withPlaceholder?: boolean;
} & TextFieldProps;

export function ExperimentalFormTextField<
  FormData extends FieldValues,
  FieldName extends FieldPath<FormData>
>({
  name,
  form,
  validate,
  maxLength,
  placeholder,
  minLength = 0,
  required = false,
  withPlaceholder = false,
  equals,
  ...props
}: ExperimentalFormTextFieldProps<FormData, FieldName>) {
  const { t } = useTranslation();

  const translatedName = t(name.toString());

  const requiredRule = required
    ? typeof required === "string"
      ? t(required, { value: translatedName })
      : t("value required", { value: translatedName })
    : false;

  const minLengthRule =
    minLength > 0
      ? {
          value: minLength,
          message: t("min length value", {
            name: translatedName,
            value: minLength,
          }),
        }
      : undefined;

  const maxLengthRule =
    maxLength !== undefined
      ? {
          value: maxLength,
          message: t("max length value", {
            name: translatedName,
            value: maxLength,
          }),
        }
      : undefined;

  const label = translatedName !== name ? translatedName : undefined;

  const equalsRules = equals ? { equals } : undefined;

  return (
    <TextField
      margin="normal"
      {...props}
      label={label}
      error={Boolean(form.formState.errors[name.toString()])}
      placeholder={withPlaceholder ? translatedName : placeholder}
      helperText={form.formState.errors[name.toString()]?.message?.toString()}
      {...form.register(name, {
        required: requiredRule,
        minLength: minLengthRule,
        maxLength: maxLengthRule,
        validate: {
          ...validate,
          ...equalsRules,
        },
      })}
    />
  );
}

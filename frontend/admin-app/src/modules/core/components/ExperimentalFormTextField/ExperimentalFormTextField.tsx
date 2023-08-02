import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldPath,
  FieldValue,
  FieldValues,
  UseFormReturn,
  Validate,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

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
  label,
  type,
  equals,
  ...props
}: ExperimentalFormTextFieldProps<FormData, FieldName>) {
  const { t } = useTranslation();

  const attributeName = name.split(".").pop()

  const translatedName = t(attributeName ?? "value");

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

  const translatedLabel = label
    ? label
    : translatedName !== name
    ? translatedName
    : undefined;

  const equalsRules = equals ? { equals } : undefined;

  const error = useMemo(() => {
    const chunks = name.split(".");
    let errors: { [key: string]: any } = form.formState.errors;
    for (const chunk of chunks) {
      const error = errors[chunk];
      if (!error) return null;
      errors = error;
    }
    return errors;
  }, [form.formState.errors, name]);

  const valueAsNumber = type === "number"

  return (
    <TextField
      margin="normal"
      {...props}
      label={translatedLabel}
      type={type}
      error={Boolean(error)}
      placeholder={withPlaceholder ? translatedName : placeholder}
      helperText={error?.message?.toString()}
      {...form.register(name, {
        required: requiredRule,
        minLength: minLengthRule,
        maxLength: maxLengthRule,
        validate: {
          ...validate,
          ...equalsRules,
        },
        valueAsNumber
      })}
    />
  );
}

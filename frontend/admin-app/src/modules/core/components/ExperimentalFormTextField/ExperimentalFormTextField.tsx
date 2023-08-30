import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldPath,
  FieldPathValue,
  FieldValue,
  FieldValues,
  UseFormReturn,
  Validate,
  get,
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
  max?: number;
  min?: number;
  equals?: Validate<FieldValue<FormData>, FormData>;
  validate?: Record<
    string,
    Validate<FieldPathValue<FormData, FieldName>, FormData>
  >;
  withPlaceholder?: boolean;
} & TextFieldProps;

export function ExperimentalFormTextField<
  FormData extends FieldValues,
  FieldName extends FieldPath<FormData>
>({
  name,
  form,
  validate,
  placeholder,
  max,
  min,
  maxLength,
  minLength = 0,
  required = false,
  withPlaceholder = false,
  label,
  type,
  equals,
  ...props
}: ExperimentalFormTextFieldProps<FormData, FieldName>) {
  const { t } = useTranslation();

  const attributeName = name.split(".").pop();

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

  const minRule =
    min !== undefined
      ? { value: min, message: t("min x", { x: min }) }
      : undefined;
  const maxRule =
    max !== undefined
      ? { value: max, message: t("max x", { x: max }) }
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

  const valueAsNumber = type === "number";

  const shrinkLabel =
    type === "datetime-local" || type === "date" ? true : undefined;

  const error = get(form.formState.errors, name);

  return (
    <TextField
      margin="normal"
      {...props}
      label={translatedLabel}
      type={type}
      error={Boolean(error)}
      placeholder={withPlaceholder ? translatedName : placeholder}
      helperText={error?.message?.toString()}
      InputLabelProps={{ shrink: shrinkLabel }}
      {...form.register(name, {
        required: requiredRule,
        minLength: minLengthRule,
        maxLength: maxLengthRule,
        min: minRule,
        max: maxRule,
        validate: {
          ...validate,
          ...equalsRules,
        },
        valueAsNumber,
      })}
    />
  );
}

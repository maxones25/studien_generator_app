import { ExperimentalFormTextField } from "@modules/core/components";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormComponentAttributeFieldProps<
  FormData extends FieldValues
> {
  form: UseFormReturn<FormData>;
  keyName: string;
  name: FieldPath<FormData>;
  required: boolean;
}

export const FormComponentAttributeField = <FormData extends FieldValues>({
  keyName,
  ...props
}: FormComponentAttributeFieldProps<FormData>) => {
  const { t } = useTranslation();
  switch (keyName) {
    case "label":
    case "defaultValue":
      return <ExperimentalFormTextField label={t(keyName)} {...props} />;
    case "min":
    case "max":
    case "rounds":
    case "warmUp":
    case "coolDown":
    case "highIntensity":
    case "lowIntensity":
      return (
        <ExperimentalFormTextField
          label={t(keyName)}
          type="number"
          {...props}
        />
      );
    default:
      throw new Error(
        `${keyName} is not defined as FormComponentAttributeField`
      );
  }
};

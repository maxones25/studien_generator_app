import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormFormData } from "@modules/forms/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormFormProps extends FormProps<FormFormData> {}

export const FormForm: React.FC<FormFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<FormFormData>({ values });

  return (
    <Form {...formProps} form={form} onSubmit={onSubmit}>
      <FormTextField
        label={t("name")}
        formState={form.formState}
        textFieldProps={form.register("name", {
          required: t("value required", { value: "name" }),
        })}
      />
      <FormControl margin="normal">
        <Button testId="group form submit button" type="submit">
          {t("save")}
        </Button>
      </FormControl>
    </Form>
  );
};

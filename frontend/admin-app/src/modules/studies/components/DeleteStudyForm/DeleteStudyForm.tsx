import { Button, Form, FormTextField, Text } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { StudyFormData } from "@modules/studies/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface DeleteStudyFormProps
  extends FormProps<StudyFormData, { name: string }> {}

export const DeleteStudyForm: React.FC<DeleteStudyFormProps> = ({
  values,
  onSubmit,
  formProps,
}) => {
  const { t } = useTranslation("studies");
  const form = useForm<{ name: string }>();

  return (
    <Form
      data-testId="delete study form"
      form={form}
      onSubmit={() => onSubmit(values!)}
      {...formProps}
    >
      <Text mt={1}>{t("delete study question", { name: values?.name })}</Text>
      <FormTextField
        placeholder={values?.name}
        formState={form.formState}
        textFieldProps={form.register("name", {
          required: t("name required"),
          validate: {
            unequal: (value) =>
              value === values?.name || t("name unequal study name"),
          },
        })}
      />
      <FormControl margin="normal">
        <Button testId="submit delete studies" type="submit" color="error">
          {t("delete")}
        </Button>
      </FormControl>
    </Form>
  );
};

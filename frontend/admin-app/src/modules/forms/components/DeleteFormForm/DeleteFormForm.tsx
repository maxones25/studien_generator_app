import {
  Button,
  ExperimentalFormTextField,
  Form,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormFormData } from "@modules/forms/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface DeleteFormFormProps extends FormProps<FormFormData> {}

export const DeleteFormForm: React.FC<DeleteFormFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<{ name: string }>();

  return (
    <Form form={form} onSubmit={() => onSubmit(values!)} {...formProps}>
      <Text mt={1}>
        {t("delete record question", {
          name: values?.name,
          record: t("form"),
        })}
      </Text>
      <ExperimentalFormTextField
        form={form}
        name="name"
        placeholder={values?.name}
        required
        equals={(value) => value === values?.name}
      />
      <FormControl margin="normal">
        <Button testId="delete form form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};

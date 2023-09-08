import {
  Button,
  ExperimentalFormTextField,
  Form,
  FormSelect,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FieldFormData, FieldTypeMap } from "@modules/fields/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FieldFormProps extends FormProps<FieldFormData> {}

export const FieldForm: React.FC<FieldFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<FieldFormData>({ values });

  return (
    <Form form={form} {...formProps} onSubmit={onSubmit}>
      <ExperimentalFormTextField form={form} name="name" required />
      <FormSelect
        label="Type"
        control={form.control}
        name="type"
        rules={{ required: "required" }}
        options={Object.keys(FieldTypeMap).map((value) => ({
          label: t(value),
          value,
        }))}
      />
      <FormControl margin="normal">
        <Button testId="submit field form" type="submit">
          {t("save")}
        </Button>
      </FormControl>
    </Form>
  );
};

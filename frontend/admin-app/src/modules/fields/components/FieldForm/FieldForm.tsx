import {
  Form,
  FormSelect,
  FormTextField,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FieldFormData, FieldTypeMap } from "@modules/fields/types";
import { Save } from "@mui/icons-material";
import { IconButton, Toolbar } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FieldFormProps extends FormProps<FieldFormData> {}

export const FieldForm: React.FC<FieldFormProps> = ({
  onSubmit,
  values,
  formProps,
  isNew,
}) => {
  const { t } = useTranslation();
  const form = useForm<FieldFormData>({ values });

  return (
    <Form form={form} {...formProps} onSubmit={onSubmit}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Text variant="h6">{isNew ? "New Field" : "Update Field"}</Text>
        <IconButton data-testid="field form submit button" type="submit">
          <Save />
        </IconButton>
      </Toolbar>
      <FormTextField
        label="Name"
        formState={form.formState}
        textFieldProps={form.register("name", {
          required: "required",
        })}
      />
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
    </Form>
  );
};

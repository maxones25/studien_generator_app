import {
  Button,
  Column,
  Form,
  FormSwitch,
  FormTextField,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormFormData } from "@modules/forms/types";
import { Add } from "@mui/icons-material";
import { Divider } from "@mui/material";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormFormProps extends FormProps<FormFormData> {}

export const FormForm: React.FC<FormFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<FormFormData>({ values });

  const pages = useFieldArray({ control: form.control, name: "data.pages" });

  return (
    <Form {...formProps} form={form} onSubmit={onSubmit}>
      <Row m={1} justifyContent="space-between">
        <FormSwitch
          control={form.control}
          name="active"
          label={t("active")}
          rules={{ required: t("value required", { value: t("active") }) }}
        />
        <Button testId="form form submit button" type="submit" sx={{ mr: 1 }}>
          Save
        </Button>
      </Row>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Row justifyContent="space-between">
        <Text>{t("pages")}</Text>
        <IconButton
          testId="add page button"
          onClick={() => pages.append({ title: "", type: "Form", fields: [] })}
          Icon={<Add />}
        />
      </Row>
      <Column>
        {pages.fields.map((page, i) => (
          <Column key={page.id}>
            <FormTextField
              label={t("title")}
              formState={form.formState}
              textFieldProps={form.register(`data.pages.${i}.title`)}
            />
          </Column>
        ))}
      </Column>
    </Form>
  );
};

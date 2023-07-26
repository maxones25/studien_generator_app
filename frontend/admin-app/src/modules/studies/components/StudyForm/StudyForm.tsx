import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { StudyFormData } from "@modules/studies/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface StudyFormProps extends FormProps<StudyFormData> {}

export const StudyForm: React.FC<StudyFormProps> = ({
  onSubmit,
  formProps,
  values,
}) => {
  const { t } = useTranslation();
  const form = useForm<StudyFormData>({ values });

  return (
    <Form
      data-testid="study form"
      form={form}
      onSubmit={onSubmit}
      {...formProps}
    >
      <FormTextField
        label="Name"
        formState={form.formState}
        textFieldProps={form.register("name", {
          required: t("value required", { value: t("name") }),
        })}
      />
      <FormControl margin="normal">
        <Button testId="submit-study-form" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};

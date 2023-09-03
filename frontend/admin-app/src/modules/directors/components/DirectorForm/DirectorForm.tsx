import {
  Button,
  ExperimentalFormTextField,
  Form,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { UpdateDirectorData } from "@modules/directors/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface DirectorFormProps extends FormProps<UpdateDirectorData> {}

export const DirectorForm: React.FC<DirectorFormProps> = ({
  onSubmit,
  formProps,
  values,
}) => {
  const { t } = useTranslation();
  const form = useForm<UpdateDirectorData>({ values });
  return (
    <Form form={form} onSubmit={onSubmit} {...formProps}>
      <ExperimentalFormTextField
        form={form}
        name="email"
        type="email"
        required
      />
      <ExperimentalFormTextField form={form} name="firstName" required />
      <ExperimentalFormTextField form={form} name="lastName" required />
      <FormControl margin="normal">
        <Button testId="submit director form" type="submit">
          {t("save")}
        </Button>
      </FormControl>
    </Form>
  );
};

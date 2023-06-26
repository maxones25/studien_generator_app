import { LoginFormData } from "@modules/auth/types";
import { Button, Form, FormEmailField, FormPasswordField, Text } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface LoginFormProps extends FormProps<LoginFormData> {}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, values, isError }) => {
  const { t } = useTranslation(["login"]);
  const form = useForm({ values });

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FormEmailField
        label={t("email")}
        formState={form.formState}
        textFieldProps={form.register("email", {
          required: t("email required"),
        })}
      />
      <FormPasswordField
        label={t("password")}
        formState={form.formState}
        textFieldProps={form.register("password", {
          required: t("password required"),
        })}
      />
      {isError && <Text data-testid="login-error-text" color="error.main">{t("access denied")}</Text>}
      <FormControl margin="normal">
        <Button testId="login-submit-button" type="submit">{t("login")}</Button>
      </FormControl>
    </Form>
  );
};

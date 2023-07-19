import { LoginFormData } from "@modules/auth/types";
import {
  Button,
  Form,
  FormPasswordField,
  FormTextField,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface LoginFormProps extends FormProps<LoginFormData> {}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isError,
  isLoading,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<LoginFormData>();

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} {...formProps}>
      <FormTextField
        label={t("email")}
        formState={form.formState}
        textFieldProps={form.register("id", {
          required: t("value required", { value: t("email") }),
        })}
      />
      <FormPasswordField
        label={t("password")}
        formState={form.formState}
        textFieldProps={form.register("password", {
          required: t("value required", { value: t("password") }),
        })}
      />
      {isError && (
        <Text data-testid="login-error-text" color="error.main">
          {t("access denied")}
        </Text>
      )}
      <FormControl margin="normal">
        <Button
          testId="login-submit-button"
          type="submit"
          isLoading={isLoading}
        >
          {t("login")}
        </Button>
      </FormControl>
    </Form>
  );
};
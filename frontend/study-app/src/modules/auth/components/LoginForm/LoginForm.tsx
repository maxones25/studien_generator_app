import { LoginFormData } from "@modules/auth/types";
import {
  Button,
  Form,
  FormPasswordField,
  FormTextField,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface LoginFormProps extends FormProps<LoginFormData> {}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isError,
  isLoading,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<LoginFormData>({ values });
  const [show, setShow] = useState(false);

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} {...formProps}>
      <FormTextField
        label={t("id")}
        sx={{display: !show ? 'none' : 'inline-flex'}}
        formState={form.formState}
        textFieldProps={form.register("id", {
          required: t("value required", { value: t("id") }),
        })}
      />
      <FormPasswordField
        label={t("password")}
        sx={{display: !show ? 'none' : 'inline-flex'}}
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
      <Button
        testId="login-submit-button"
        type="submit"
        isLoading={isLoading}
        sx={{mb: "15px"}}
      >
        {t("start")}
      </Button>
      <Text
        onClick={() => setShow(!show)}
      >
        {t("show form fields")}
      </Text>
    </Form>
  );
};

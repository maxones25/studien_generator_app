import { SignUpFormData } from "@modules/auth/types";
import {
  Button,
  Form,
  FormEmailField,
  FormPasswordField,
  FormTextField,
  Row,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface SignUpFormProps extends FormProps<SignUpFormData> {}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  isError,
  isLoading,
}) => {
  const { t } = useTranslation("signUp");
  const form = useForm<SignUpFormData>();

  const password = form.watch("password");

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Row flexWrap="wrap">
        <FormTextField
          sx={{ flex: 1 }}
          label={t("firstName")}
          formState={form.formState}
          textFieldProps={form.register("firstName", {
            required: t("firstName required"),
          })}
        />
        <FormTextField
          sx={{ flex: 1, ml: 3 }}
          label={t("lastName")}
          formState={form.formState}
          textFieldProps={form.register("lastName", {
            required: t("lastName required"),
          })}
        />
      </Row>
      <FormEmailField
        label={t("email")}
        formState={form.formState}
        textFieldProps={form.register("email", {
          required: t("email required"),
        })}
      />
      <Row flexWrap="wrap">
        <FormPasswordField
          sx={{ flex: 1 }}
          label={t("password")}
          formState={form.formState}
          textFieldProps={form.register("password", {
            required: t("password required"),
            minLength: {
              value: 8,
              message: t("min length password", { value: 8 }),
            },
          })}
        />
        <FormPasswordField
          sx={{ flex: 1, ml: 3 }}
          label={t("validate password")}
          formState={form.formState}
          textFieldProps={form.register("validatePassword", {
            required: t("password required"),
            validate: {
              unequal: (value) => value === password || t("passwords unequal"),
            },
          })}
        />
      </Row>
      <FormPasswordField
        label={t("activationPassword")}
        formState={form.formState}
        textFieldProps={form.register("activationPassword", {
          required: t("activationPassword required"),
        })}
      />
      {isError && (
        <Text data-testid="login-error-text" color="error.main">
          {t("access denied")}
        </Text>
      )}
      <FormControl margin="normal">
        <Button
          testId="sign-up-submit-button"
          type="submit"
          isLoading={isLoading}
        >
          {t("sign up")}
        </Button>
      </FormControl>
    </Form>
  );
};

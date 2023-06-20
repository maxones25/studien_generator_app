import { LoginFormData } from "@modules/auth/types";
import { Button, Form } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { TextField, FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface LoginFormProps extends FormProps<LoginFormData> {}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, values }) => {
  const { t } = useTranslation();
  const form = useForm({ values });

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {!values?.id && (
        <TextField
          label={t("login.id")}
          margin="normal"
          {...form.register("id", {
            required: "id required",
          })}
        />
      )}
      <TextField
        label={t("login.password")}
        margin="normal"
        {...form.register("password", {
          required: "password required",
        })}
      />
      <FormControl>
        <Button type="submit">Login</Button>
      </FormControl>
    </Form>
  );
};
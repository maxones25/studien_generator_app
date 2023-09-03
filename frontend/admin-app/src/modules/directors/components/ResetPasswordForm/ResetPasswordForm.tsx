import {
  Button,
  ExperimentalFormTextField,
  Form,
} from "@modules/core/components";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ResetPasswordData = {
  password: string;
  repeatPassword: string;
};
export interface ResetPasswordFormProps {
  onSubmit: (password: string) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
}) => {
  const { t } = useTranslation();
  const form = useForm<ResetPasswordData>();
  return (
    <Form form={form} onSubmit={({ password }) => onSubmit(password)}>
      <ExperimentalFormTextField
        form={form}
        type="password"
        equals={(value) =>
          value === form.watch("repeatPassword") || t("passwords unequal")
        }
        name="password"
        required
      />
      <ExperimentalFormTextField
        label={t("validate password")}
        form={form}
        type="password"
        name="repeatPassword"
        required
        equals={(value) =>
          value === form.watch("password") || t("passwords unequal")
        }
      />
      <FormControl margin="normal">
        <Button testId="submit reset password" type="submit">
          {t("save")}
        </Button>
      </FormControl>
    </Form>
  );
};

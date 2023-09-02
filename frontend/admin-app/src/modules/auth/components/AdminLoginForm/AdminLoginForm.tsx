import {
  Button,
  ExperimentalFormTextField,
  Form,
} from "@modules/core/components";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
export type AdminLoginData = {
  activationPassword: string;
};

export interface AdminLoginFormProps {
  onSubmit: (data: AdminLoginData) => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const form = useForm<AdminLoginData>();

  return (
    <Form form={form} onSubmit={(data) => onSubmit(data)}>
      <ExperimentalFormTextField
        form={form}
        name="activationPassword"
        required
      />
      <FormControl>
        <Button testId="login admin" type="submit">
          {t("login")}
        </Button>
      </FormControl>
    </Form>
  );
};

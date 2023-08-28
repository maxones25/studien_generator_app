import {
  Button,
  ExperimentalFormTextField,
  Form,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { useStudy } from "@modules/studies/contexts";
import React from "react";
import { Validate, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  startDate: string;
};

export interface StartDateFormProps extends FormProps<FormData> {}

export const StartDateForm: React.FC<StartDateFormProps> = ({ onSubmit }) => {
  const study = useStudy();
  const { t } = useTranslation();
  const form = useForm<FormData>();

  const validateStartDate: Validate<string, FormData> = (date) => {
    const { startDate, endDate } = study;
    if (!startDate) return "error";
    if (!endDate) return "error";
    if (date < startDate || date > endDate)
      return t("date must be between", {
        name: t("startDate"),
        start: new Date(startDate).toLocaleDateString("de"),
        end: new Date(endDate).toLocaleDateString("de"),
      });
    return true;
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <ExperimentalFormTextField
        form={form}
        name="startDate"
        type="date"
        required
        InputLabelProps={{
          shrink: true,
        }}
        validate={{
          validateStartDate,
        }}
      />
      <Button testId="start study" type="submit">
        {t("continue")}
      </Button>
    </Form>
  );
};

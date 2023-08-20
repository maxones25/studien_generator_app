import {
  Button,
  ExperimentalFormTextField,
  Form,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { useStudy } from "@modules/studies/contexts";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Validate, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  startDate: string;
};

export interface StartStudyDialogProps extends FormProps<FormData> {
  open: boolean;
}

export const StartStudyDialog: React.FC<StartStudyDialogProps> = ({
  open,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const study = useStudy();
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
    <Dialog open={open} onClose={onCancel}>
      <Form form={form} onSubmit={onSubmit}>
        <DialogTitle>Studie starten</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button testId="start study" type="submit">
            Starten
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Button, ExperimentalFormTextField, Form } from "..";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

type Question = {
  text: string;
  params: Record<string, string>;
};

type Translator = (text: string, params?: Record<string, string>) => string;

const translateQuestion = (t: Translator, question: Question) => {
  return t(
    question.text,
    Object.keys(question.params).reduce<Record<string, string>>(
      (record, key) => {
        record[key] = t(question.params[key]);
        return record;
      },
      {}
    )
  );
};

export interface DeleteDialogProps {
  open: boolean;
  record: string;
  target: string;
  question?: Question;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  record,
  target,
  question,
  // isLoading = false,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const form = useForm<{ target: string }>();

  const questionText = question
    ? translateQuestion(t, question)
    : translateQuestion(t, {
        text: "delete record question",
        params: { record, name: target },
      });

  const handleCancel = () => {
    form.reset()
    onCancel()
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <Form form={form} onSubmit={() => onConfirm()}>
        <DialogTitle>{t("delete record", { record: t(record) })}</DialogTitle>
        <DialogContent>
          <DialogContentText>{questionText}</DialogContentText>
          <ExperimentalFormTextField
            form={form}
            name="target"
            placeholder={target}
            equals={(currentTarget) => currentTarget === target || t("invalid")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            testId={`cancel delete ${record}`}
            type="button"
            color="secondary"
            onClick={handleCancel}
          >
            {t("cancel")}
          </Button>
          <Button
            testId={`confirm delete ${record}`}
            type="submit"
            color="error"
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

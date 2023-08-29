import {
  Button,
  ExperimentalFormTextField,
  Form,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { GroupFormSelect } from "@modules/groups/components";
import { Participant } from "@modules/participants/types";
import { TaskFormData } from "@modules/tasks/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface TaskFormProps extends FormProps<TaskFormData> {
  participant: Participant;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  values,
  formProps,
  isNew,
  participant,
}) => {
  const { t } = useTranslation();
  const form = useForm<TaskFormData>({ values });

  return (
    <Form {...formProps} form={form} onSubmit={onSubmit}>
      {isNew && (
        <GroupFormSelect
          control={form.control}
          name="formId"
          rules={{ required: t("value required", { value: t("form") }) }}
          label={t("form")}
          groupId={participant.group?.id!}
        />
      )}
      <ExperimentalFormTextField
        form={form}
        name="scheduledAt"
        type="datetime-local"
        required
      />
      <ExperimentalFormTextField
        form={form}
        name="completedAt"
        type="datetime-local"
      />
      <ExperimentalFormTextField
        form={form}
        name="rescheduled"
        type="number"
        min={0}
      />
      <FormControl margin="normal">
        <Button testId="task form submit button" type="submit">
          {t("save")}
        </Button>
      </FormControl>
    </Form>
  );
};

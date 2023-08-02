import { IconButton, Row } from "@modules/core/components";
import { useAddFormPage, useRemoveFormPage } from "@modules/formPages/hooks";
import { FormPage } from "@modules/formPages/types";
import { useFormEditorContext } from "@modules/forms/contexts";
import { useFormEditor } from "@modules/forms/hooks";
import { Add, Delete } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface FormPageListProps {}

export const FormPageList: React.FC<FormPageListProps> = () => {
  const { t } = useTranslation();
  const { formPages } = useFormEditorContext()
  const formEditor = useFormEditor()
  const addFormPage = useAddFormPage();
  const removeFormPage = useRemoveFormPage();

  const handleAddFormPage = () => {
    addFormPage.mutate({});
  };

  const handleRemoveFormPage = (page: FormPage) => () => {
    removeFormPage.mutate(page);
  };

  return (
    <Row p={2} pb={0}>
      {formPages?.map(({ isSelected, data: page }, i, arr) => {
        const isLast = arr.length - 1 === i;
        return (
          <Chip
            key={page.id}
            variant="filled"
            label={t("page x", { number: page.number })}
            color={isSelected ? "primary" : "default"}
            sx={{ mr: isLast ? 0 : 1 }}
            size="medium"
            onClick={() => formEditor.page.set(page)}
            onDelete={isSelected ? handleRemoveFormPage(page) : undefined}
            deleteIcon={isSelected ? <Delete /> : undefined}
          />
        );
      })}
      <IconButton
        testId="add form page button"
        Icon={<Add />}
        onClick={handleAddFormPage}
      />
    </Row>
  );
};

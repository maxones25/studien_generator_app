import { Column, IconButton, Page, Row } from "@modules/core/components";
import {
  useAddFormPage,
  useGetFormPages,
  useRemoveFormPage,
} from "@modules/formPages/hooks";
import { Add, Delete } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { useNavigationHelper } from "@modules/core/hooks";
import { useFormId, usePageNumber } from "@modules/navigation/hooks";
import { useTranslation } from "react-i18next";
import { FormPage } from "@modules/formPages/types";

export interface FormPageProps {}

const FormPage: React.FC<FormPageProps> = () => {
  const { t } = useTranslation();
  const getFormPages = useGetFormPages();
  const addFormPage = useAddFormPage();
  const removeFormPage = useRemoveFormPage();
  const navigate = useNavigationHelper();
  const formId = useFormId();
  const pageNumber = usePageNumber();

  const handleAddFormPage = () => {
    addFormPage.mutate({});
  };

  const handleRemoveFormPage = (page: FormPage) => () => {
    removeFormPage.mutate(page);
  };

  return (
    <Page testId="form page">
      <Row p={2} pb={0}>
        {getFormPages.data?.map((page, i, arr) => {
          const isSelected = pageNumber === page.number;
          const isLast = arr.length - 1 === i;
          return (
            <Chip
              key={page.id}
              variant="filled"
              label={t("page x", { number: page.number })}
              color={isSelected ? "primary" : "default"}
              sx={{ mr: isLast ? 0 : 1 }}
              size="medium"
              onClick={navigate.handle(`../${formId}/pages/${page.number}`)}
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
      <Row flex={1} p={2}>
        <Column
          height="100%"
          boxShadow={4}
          borderRadius={10}
          width={300}
        ></Column>
      </Row>
    </Page>
  );
};

export default FormPage;

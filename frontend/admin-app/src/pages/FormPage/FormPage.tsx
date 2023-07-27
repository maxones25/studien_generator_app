import { IconButton, Page } from "@modules/core/components";
import { useAddFormPage, useGetFormPages } from "@modules/formPages/hooks";
import { Add } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useNavigationHelper } from "@modules/core/hooks";
import { useFormId, usePageNumber } from "@modules/navigation/hooks";

export interface FormPageProps {}

const FormPage: React.FC<FormPageProps> = () => {
  const getFormPages = useGetFormPages();
  const addFormPage = useAddFormPage();
  const navigate = useNavigationHelper();
  const formId = useFormId();
  const pageNumber = usePageNumber();

  console.log(pageNumber);

  return (
    <Page testId="form page">
      <Tabs
        onChange={(_, value) => {
          console.log([value]);
          navigate.to(`../${formId}/pages/${value}`);
        }}
        value={`${pageNumber}`}
      >
        {getFormPages.data?.map((page, i) => (
          <Tab key={page.id} value={`${i + 1}`} label={page.title} />
        ))}
        <IconButton
          testId="add form page button"
          Icon={<Add />}
          onClick={() => addFormPage.mutate({ title: "Seite 1" })}
        />
      </Tabs>
    </Page>
  );
};

export default FormPage;

import { Page, Text } from "@modules/core/components";
import React from "react";
import { FormEditor } from "@modules/forms/components";
import { useGetComponents } from "@modules/components/hooks";
import { useGetFormPages } from "@modules/formPages/hooks";
import { LinearProgress } from "@mui/material";
import { useGetFormEntities } from "@modules/formEntities/hooks";
import { usePageId } from "@modules/navigation/hooks";
import { Navigate } from "react-router-dom";

export interface FormPageProps {}

const FormPage: React.FC<FormPageProps> = () => {
  const getComponents = useGetComponents();
  const getFormPages = useGetFormPages();
  const getFormEntities = useGetFormEntities();
  const pageId = usePageId(false);

  if (getFormPages.isLoading) {
    return <LinearProgress />;
  }

  if (getComponents.isLoading) {
    return <LinearProgress />;
  }

  if (getFormEntities.isLoading) {
    return <LinearProgress />;
  }

  if (getComponents.isError) {
    return <Text color="error.main">Components could not be loaded</Text>;
  }

  if (getFormPages.isError) {
    return <Text color="error.main">Form Pages could not be loaded</Text>;
  }

  if (getFormEntities.isError) {
    return <Text color="error.main">Form Entities could not be loaded</Text>;
  }

  if (!pageId && Array.isArray(getFormPages.data)) {
    const page = [...getFormPages.data].pop();
    return <Navigate to={`${page?.id}`} />;
  }

  if (!pageId) {
    return <LinearProgress />;
  }

  return (
    <Page testId="form page" flex={1}>
      <FormEditor
        components={getComponents.data!}
        formPages={getFormPages.data!}
        formEntities={getFormEntities.data!}
      />
    </Page>
  );
};

export default FormPage;

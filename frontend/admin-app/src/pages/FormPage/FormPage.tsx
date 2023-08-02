import { Page, Text } from "@modules/core/components";
import React from "react";
import { FormEditor } from "@modules/forms/components";
import { useGetComponents } from "@modules/components/hooks";
import { useGetFormPages } from "@modules/formPages/hooks";
import { LinearProgress } from "@mui/material";
import { useGetFormEntities } from "@modules/formEntities/hooks";

export interface FormPageProps {}

const FormPage: React.FC<FormPageProps> = () => {
  const getComponents = useGetComponents();
  const getFormPages = useGetFormPages();
  const getFormEntities = useGetFormEntities();

  if (getComponents.isLoading) {
    return <LinearProgress />;
  }

  if (getFormPages.isLoading) {
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

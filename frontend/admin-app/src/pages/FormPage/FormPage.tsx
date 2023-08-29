import { Editable, Page, Text } from "@modules/core/components";
import React from "react";
import { FormEditor } from "@modules/forms/components";
import { useGetComponents } from "@modules/components/hooks";
import { useGetPages } from "@modules/formPages/hooks";
import { Divider, LinearProgress, Toolbar } from "@mui/material";
import { useGetEntities } from "@modules/formEntities/hooks";
import { usePageId } from "@modules/navigation/hooks";
import { Navigate } from "react-router-dom";
import { useChangeName, useGetForm } from "@modules/forms/hooks";

export interface FormPageProps {}

const FormPage: React.FC<FormPageProps> = () => {
  const getForm = useGetForm();
  const getComponents = useGetComponents();
  const getFormPages = useGetPages();
  const getFormEntities = useGetEntities();
  const pageId = usePageId(false);
  const changeName = useChangeName();

  if (getForm.isLoading) {
    return <LinearProgress />;
  }

  if (getFormPages.isLoading) {
    return <LinearProgress />;
  }

  if (getComponents.isLoading) {
    return <LinearProgress />;
  }

  if (getFormEntities.isLoading) {
    return <LinearProgress />;
  }

  if (getForm.isError) {
    return <Text color="error.main">Form could not be loaded</Text>;
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

  const form = getForm.data!;

  return (
    <Page testId="form page" flex={1}>
      <Toolbar>
        <Editable
          defaultText={form.name}
          onSubmit={(name) => changeName.mutate({ id: form.id, name })}
          isLoading={changeName.isLoading || getForm.isFetching}
        >
          <Text variant="h6">{form.name}</Text>
        </Editable>
      </Toolbar>
      <Divider/>
      <FormEditor
        components={getComponents.data!}
        formPages={getFormPages.data!}
        formEntities={getFormEntities.data!}
      />
    </Page>
  );
};

export default FormPage;

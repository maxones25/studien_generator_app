import { Row } from "@modules/core/components";
import { FormPageList } from "@modules/formPages/components";
import { FormEditorProvider } from "@modules/forms/contexts";
import React from "react";
import { FormPreview, FormSideBar } from "..";
import { Component } from "@modules/components/types";
import { FormPage } from "@modules/formPages/types";
import { FormEntity } from "@modules/formEntities/types";

export interface FormEditorProps {
  pageId: string;
  components: Component[];
  formPages: FormPage[];
  formEntities: FormEntity[];
}

export const FormEditor: React.FC<FormEditorProps> = ({
  pageId,
  components,
  formEntities,
  formPages,
}) => {
  return (
    <FormEditorProvider
      pageId={pageId}
      components={components}
      formPages={formPages}
      formEntities={formEntities}
    >
      <FormPageList />
      <Row
        flex={1}
        p={2}
        alignItems="stretch"
        position="relative"
        sx={{ overflowY: "hidden" }}
      >
        <FormPreview />
        <FormSideBar />
      </Row>
    </FormEditorProvider>
  );
};

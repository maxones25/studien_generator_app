import { Button, Column, Page, Row, Text } from "@modules/core/components";
import { StudiesList, StudyForm } from "@modules/studies/components";
import { useCreateStudy } from "@modules/studies/hooks";
import { StudyFormData } from "@modules/studies/types";
import { Dialog } from "@mui/material";
import React, { useState } from "react";

export interface StudiesPageProps {}

const StudiesPage: React.FC<StudiesPageProps> = () => {
  const [formData, setFormData] = useState<StudyFormData | undefined>(
    undefined
  );
  const createStudy = useCreateStudy();

  const handleCreateStudy = () => {
    setFormData({ name: "" });
  };

  const handleSaveStudy = (data: StudyFormData) => {
    createStudy.mutate(data);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setFormData(undefined);
  };

  return (
    <Page testId="studies page" alignItems="center">
      <Column mt={6} minWidth="50%">
        <Row justifyContent="space-between" mb={1}>
          <Text variant="h6">Studien</Text>
          <Button testId="create-study-button" onClick={handleCreateStudy}>
            Studie anlegen
          </Button>
        </Row>
        <StudiesList />
      </Column>
      <Dialog open={Boolean(formData)} onClose={handleCloseDialog}>
        <StudyForm
          onSubmit={handleSaveStudy}
          values={formData}
          isError={createStudy.isError}
          isLoading={createStudy.isLoading}
        />
      </Dialog>
    </Page>
  );
};

export default StudiesPage;

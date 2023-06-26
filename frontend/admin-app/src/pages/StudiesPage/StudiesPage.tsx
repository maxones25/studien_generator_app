import { Button, Column, Page, Row, Text } from "@modules/core/components";
import { StudiesList, StudyForm } from "@modules/studies/components";
import { useCreateStudy } from "@modules/studies/hooks";
import { StudyFormData } from "@modules/studies/types";
import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export interface StudiesPageProps {}

const StudiesPage: React.FC<StudiesPageProps> = () => {
  const { t } = useTranslation("studies");
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
        <Row justifyContent="space-between" mb={2}>
          <Text variant="h6">{t("studies")}</Text>
          <Button testId="create-study-button" onClick={handleCreateStudy}>
            {t("create study")}
          </Button>
        </Row>
        <StudiesList />
      </Column>
      <Dialog open={Boolean(formData)} onClose={handleCloseDialog}>
        <Column p={2}>
          <Text color="text.secondary">
            {formData?.id ? t("update study") : t("create study")}
          </Text>
          <StudyForm
            formProps={{
              p: 0,
            }}
            onSubmit={handleSaveStudy}
            values={formData}
            isError={createStudy.isError}
            isLoading={createStudy.isLoading}
          />
        </Column>
      </Dialog>
    </Page>
  );
};

export default StudiesPage;

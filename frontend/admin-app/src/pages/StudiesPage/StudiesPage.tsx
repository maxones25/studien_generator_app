import { Button, Column, Page, Row, Text } from "@modules/core/components";
import { useFormData } from "@modules/core/hooks";
import {
  DeleteStudyForm,
  StudiesList,
  StudyForm,
} from "@modules/studies/components";
import {
  useCreateStudy,
  useDeleteStudy,
  useUpdateStudy,
} from "@modules/studies/hooks";
import { StudyFormData } from "@modules/studies/types";
import { Dialog } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface StudiesPageProps {}

const StudiesPage: React.FC<StudiesPageProps> = () => {
  const { t } = useTranslation("studies");
  const editFormData = useFormData<StudyFormData>();
  const deleteFormData = useFormData<StudyFormData>();
  const createStudy = useCreateStudy();
  const updateStudy = useUpdateStudy();
  const deleteStudy = useDeleteStudy();

  const handleSaveStudy = (data: StudyFormData) => {
    if (data.id) {
      updateStudy.mutate(data);
    } else {
      createStudy.mutate(data);
    }
    editFormData.reset();
  };

  const handleDeleteStudy = (data: StudyFormData) => {
    deleteStudy.mutate(data);
    deleteFormData.reset();
  };

  return (
    <Page testId="studies page" alignItems="center">
      <Column mt={6} minWidth="50%">
        <Row justifyContent="space-between" mb={2}>
          <Text variant="h6">{t("studies")}</Text>
          <Button
            testId="create-study-button"
            onClick={editFormData.handleSet({ name: "" })}
          >
            {t("create study")}
          </Button>
        </Row>
        <StudiesList
          onUpdate={editFormData.set}
          onDelete={deleteFormData.set}
        />
      </Column>
      <Dialog open={editFormData.hasData} onClose={editFormData.reset}>
        <Column p={2}>
          <Text color="text.secondary">
            {editFormData.isNew ? t("update study") : t("create study")}
          </Text>
          <StudyForm
            formProps={{
              p: 0,
            }}
            onSubmit={handleSaveStudy}
            values={editFormData.data}
            isError={createStudy.isError}
            isLoading={createStudy.isLoading}
          />
        </Column>
      </Dialog>
      <Dialog open={deleteFormData.hasData} onClose={deleteFormData.reset}>
        <Column p={2}>
          <Text color="text.secondary">{t("delete study")}</Text>
          <DeleteStudyForm
            formProps={{
              p: 0,
            }}
            onSubmit={handleDeleteStudy}
            values={deleteFormData.data}
          />
        </Column>
      </Dialog>
    </Page>
  );
};

export default StudiesPage;

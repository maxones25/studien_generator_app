import {
  Button,
  Column,
  DataDialog,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
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
import React from "react";
import { useTranslation } from "react-i18next";

export interface StudiesPageProps {}

const StudiesPage: React.FC<StudiesPageProps> = () => {
  const navigate = useNavigationHelper();
  const { t } = useTranslation();
  const editFormData = useFormData<StudyFormData>();
  const deleteFormData = useFormData<StudyFormData>();
  const createStudy = useCreateStudy();
  const updateStudy = useUpdateStudy();
  const deleteStudy = useDeleteStudy();

  return (
    <Page testId="studies page" alignItems="center">
      <Column mt={6} mb={3} minWidth="50%" sx={{ overflowY: "hidden" }}>
        <Row justifyContent="space-between" mb={2}>
          <Text variant="h6">{t("studies")}</Text>
          <Button
            testId="create-study-button"
            onClick={editFormData.handleSet({ name: "" })}
          >
            {t("create data", { data: t("study") })}
          </Button>
        </Row>
        <StudiesList
          onUpdate={editFormData.set}
          onDelete={deleteFormData.set}
          onSelect={(study) => navigate.to(study.id)}
        />
      </Column>
      <DataDialog
        client={editFormData}
        createTitle={t("create data", { data: t("study") })}
        updateTitle={t("update data", { data: t("study") })}
        Form={StudyForm}
        onCreate={createStudy.mutateAsync}
        onUpdate={updateStudy.mutateAsync}
      />
      <DataDialog
        client={deleteFormData}
        mode="delete"
        deleteTitle={t("delete data", { data: t("study") })}
        Form={DeleteStudyForm}
        onDelete={deleteStudy.mutateAsync}
      />
    </Page>
  );
};

export default StudiesPage;

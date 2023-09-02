import { useAccessTokenContext } from "@modules/auth/contexts";
import {
  Button,
  Column,
  DataDialog,
  IconButton,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
import { useGetMe } from "@modules/directors/hooks";
import { StudiesList, StudyForm } from "@modules/studies/components";
import { useCreateStudy } from "@modules/studies/hooks";
import { StudyFormData } from "@modules/studies/types";
import { AdminPanelSettings, Logout } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface StudiesPageProps {}

const StudiesPage: React.FC<StudiesPageProps> = () => {
  const navigate = useNavigationHelper();
  const editFormData = useFormData<StudyFormData>();
  const accessToken = useAccessTokenContext();
  const { t } = useTranslation();
  const createStudy = useCreateStudy();
  const getMe = useGetMe();

  return (
    <Page testId="studies page" alignItems="center">
      <Column mt={6} mb={3} minWidth="50%" sx={{ overflowY: "hidden" }}>
        <Row mb={6} justifyContent="space-between">
          <Text>
            {getMe.data &&
              t("hello") +
                " " +
                getMe.data?.firstName +
                " " +
                getMe.data?.lastName}
          </Text>
          <Row>
            <IconButton
              testId="logout director"
              Icon={<Logout />}
              tooltipProps={{ title: t("logout") }}
              onClick={accessToken.reset}
            />
          </Row>
        </Row>
        <Row justifyContent="space-between" mb={2}>
          <Text variant="h6">{t("studies")}</Text>
          <Button
            testId="create-study-button"
            onClick={editFormData.handleSet({ name: "" })}
          >
            {t("create data", { data: t("study") })}
          </Button>
        </Row>
        <StudiesList onSelect={(study) => navigate.to(study.id)} />
      </Column>
      <DataDialog
        client={editFormData}
        createTitle={t("create data", { data: t("study") })}
        updateTitle={t("update data", { data: t("study") })}
        Form={StudyForm}
        onCreate={createStudy.mutateAsync}
      />
    </Page>
  );
};

export default StudiesPage;

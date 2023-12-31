import {
  Column,
  DeleteDialog,
  Editable,
  IconButton,
  OnlyAdmin,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useNavigationHelper, useOpen } from "@modules/core/hooks";
import {
  AppointmentsCard,
  MembersCard,
  StudyCard,
} from "@modules/studies/components";
import { useStudy } from "@modules/studies/contexts";
import {
  useChangeStudyName,
  useDeleteStudy,
  useRestoreStudy,
} from "@modules/studies/hooks";
import { Delete, RestoreFromTrash } from "@mui/icons-material";
import { Chip, Divider, Toolbar } from "@mui/material";
import { t } from "i18next";
import React from "react";

export interface StudyPageProps {}

const StudyPage: React.FC<StudyPageProps> = () => {
  const study = useStudy();
  const deleteStudy = useDeleteStudy();
  const restoreStudy = useRestoreStudy();
  const deleteDialog = useOpen();
  const changeName = useChangeStudyName();
  const navigate = useNavigationHelper();

  const isDeleted = study.deletedAt !== null;

  return (
    <Page testId="study page" flex={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Row>
          <Editable
            testId="edit name"
            inputTestId="change name"
            defaultText={study.name}
            onSubmit={(name) => changeName.mutate({ id: study.id, name })}
            isLoading={changeName.isLoading}
          >
            <Text variant="h6">{study.name}</Text>
          </Editable>
          {isDeleted && (
            <Chip label={t("deleted")} color="error" sx={{ ml: 2 }} />
          )}
        </Row>
        <OnlyAdmin>
          {({ disabled }) =>
            isDeleted ? (
              <IconButton
                testId="restore study"
                Icon={<RestoreFromTrash />}
                onClick={() => restoreStudy.mutate(study)}
                disabled={disabled}
                tooltipProps={{
                  title: t("restore record", { record: t("study") }),
                }}
              />
            ) : (
              <IconButton
                testId="open delete dialog"
                Icon={<Delete />}
                onClick={deleteDialog.open}
                disabled={disabled}
              />
            )
          }
        </OnlyAdmin>
      </Toolbar>
      <Divider />
      <Column flex={1} overflowY="hidden">
        <StudyCard study={study} />
        <Row flex={1} alignItems="stretch" overflowY="hidden">
          <MembersCard m={2} mt={0} p={2} minWidth={500} />
          <AppointmentsCard minWidth={400} />
        </Row>
      </Column>
      <DeleteDialog
        open={deleteDialog.isOpen}
        onCancel={deleteDialog.close}
        onConfirm={({ hardDelete }) => {
          deleteStudy.mutateAsync({ study, hardDelete }).then(() => {
            deleteDialog.close();
            navigate.to("/");
          });
        }}
        record="study"
        target={study.name}
        hasSoftDelete
      />
    </Page>
  );
};

export default StudyPage;

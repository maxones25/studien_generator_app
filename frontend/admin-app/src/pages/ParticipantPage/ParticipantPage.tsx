import {
  Button,
  Column,
  ConfirmDialog,
  DeleteDialog,
  DeleteDialogData,
  Editable,
  IconButton,
  OnlyAdmin,
  Page,
  Row,
  Text,
  TooltipGuard,
} from "@modules/core/components";
import { useNavigationHelper, useOpen, useValue } from "@modules/core/hooks";
import { GroupSelect } from "@modules/groups/components";
import {
  QrCodeDialog,
  StartStudyDialog,
  TasksCard,
} from "@modules/participants/components";
import {
  useChangeParticipantGroup,
  useChangeParticipantNumber,
  useDeleteParticipant,
  useGetParticipant,
  useRemoveGroup,
  useResetPassword,
  useStartStudy,
} from "@modules/participants/hooks";
import { useStudy } from "@modules/studies/contexts";
import { Delete, Launch } from "@mui/icons-material";
import { Divider, LinearProgress, Toolbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface ParticipantPageProps {}

const ParticipantPage: React.FC<ParticipantPageProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();
  const deleteDialog = useOpen();
  const getParticipant = useGetParticipant();
  const changeParticipantNumber = useChangeParticipantNumber();
  const changeParticipantGroup = useChangeParticipantGroup();
  const deleteParticipant = useDeleteParticipant();
  const removeGroup = useRemoveGroup();
  const resetPassword = useResetPassword();
  const study = useStudy();
  const startStudy = useStartStudy();
  const startStudyDialog = useOpen();
  const resetDialog = useOpen();
  const uri = useValue<string | undefined>("");

  if (getParticipant.isLoading) {
    return <LinearProgress />;
  }

  if (getParticipant.isError) throw new Error("participant not found");

  const participant = getParticipant.data!;

  const handleDeleteParticipant = ({
    hardDelete,
    deleteRelated,
  }: DeleteDialogData) => {
    deleteParticipant
      .mutateAsync({ participant, hardDelete, deleteRelated })
      .then(() => {
        navigate.to("../");
      });
  };

  const isStarted = Boolean(participant.startedAt);

  const hasGroup = participant.group !== null;

  return (
    <Page testId="participant page" flex={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Row>
          <Editable
            defaultText={participant.number}
            onSubmit={(number) => changeParticipantNumber.mutate({ number })}
          >
            <Text variant="h6">{getParticipant.data?.number}</Text>
          </Editable>
          <GroupSelect
            size="small"
            formControlProps={{
              margin: "none",
              sx: {
                ml: 2,
              },
            }}
            value={participant.group?.id}
            sx={{ minWidth: 200 }}
            onChange={(group) => {
              if (group) {
                changeParticipantGroup.mutate({ participant, group });
              } else {
                removeGroup.mutate(participant);
              }
            }}
          />
          {hasGroup && (
            <IconButton
              testId="open group"
              Icon={<Launch />}
              onClick={navigate.handle(`../../groups/${participant.group?.id}`)}
              tooltipProps={{
                title: t("open record", { record: t("group") }),
              }}
            />
          )}
        </Row>
        <OnlyAdmin>
          {(adminProps) => (
            <IconButton
              testId="delete participant"
              Icon={<Delete />}
              onClick={deleteDialog.open}
              tooltipProps={{
                title: t("delete record", { record: t("participant") }),
              }}
              {...adminProps}
            />
          )}
        </OnlyAdmin>
        <DeleteDialog
          open={deleteDialog.isOpen}
          record="participant"
          onConfirm={handleDeleteParticipant}
          onCancel={deleteDialog.close}
          target={getParticipant.data?.number!}
          isLoading={deleteParticipant.isLoading}
          hasDeleteRelated
          hasSoftDelete
        />
      </Toolbar>
      <Divider />
      <Row
        flex={1}
        justifyContent="center"
        alignItems="stretch"
        overflowY="hidden"
      >
        {isStarted ? (
          <>
            <Column m={2} p={1} boxShadow={4}>
              <Text>
                {participant.startedAt &&
                  new Date(participant.startedAt).toLocaleDateString("de")}
              </Text>
              <Button testId="reset" onClick={resetDialog.open}>
                Reset Password
              </Button>
              <Button
                testId="send message"
                onClick={navigate.handle(`../../chats/${participant.chat.id}`)}
              >
                Nachricht senden
              </Button>
            </Column>
            <TasksCard
              participant={participant}
              flex={1}
              m={2}
              ml={0}
              alignSelf="stretch"
            />
          </>
        ) : (
          <Column justifyContent="center">
            <TooltipGuard
              validate={{
                "study must be active": !study.isActive,
                "group required": !hasGroup,
              }}
            >
              {(disabled) => (
                <Button
                  testId="open start study dialog"
                  disabled={disabled}
                  onClick={startStudyDialog.open}
                  sx={{ alignSelf: "center" }}
                >
                  {t("start study")}
                </Button>
              )}
            </TooltipGuard>
          </Column>
        )}
      </Row>
      <StartStudyDialog
        open={startStudyDialog.isOpen}
        onCancel={startStudyDialog.close}
        participant={participant}
        onSubmit={(data) => {
          startStudy.mutateAsync(data).then((appUri) => {
            uri.set(appUri);
            startStudyDialog.close();
          });
        }}
      />
      <QrCodeDialog
        fullScreen
        uri={uri.value}
        onClose={uri.reset}
        PaperProps={{ sx: { p: 12, boxSizing: "border-box" } }}
      />
      <ConfirmDialog
        open={resetDialog.isOpen}
        title="Reset Password"
        text="Bla bla"
        onClose={resetDialog.close}
        renderActions={
          <Button
            testId="reset password"
            onClick={() => {
              resetPassword.mutateAsync(participant).then((appUri) => {
                uri.set(appUri);
                resetDialog.close();
              });
            }}
          >
            Reset
          </Button>
        }
      />
    </Page>
  );
};

export default ParticipantPage;

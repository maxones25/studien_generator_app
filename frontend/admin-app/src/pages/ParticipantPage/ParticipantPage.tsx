import {
  Button,
  DeleteDialog,
  Editable,
  IconButton,
  OnlyAdmin,
  Page,
  Row,
  Text,
  TooltipGuard,
} from "@modules/core/components";
import { useNavigationHelper, useOpen } from "@modules/core/hooks";
import { GroupSelect } from "@modules/groups/components";
import { StartStudyDialog } from "@modules/participants/components";
import {
  useChangeParticipantGroup,
  useChangeParticipantNumber,
  useDeleteParticipant,
  useGetParticipant,
  useStartStudy,
} from "@modules/participants/hooks";
import { useStudy } from "@modules/studies/contexts";
import { Delete } from "@mui/icons-material";
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
  const study = useStudy();
  const startStudy = useStartStudy();
  const startStudyDialog = useOpen();

  if (getParticipant.isLoading) {
    return <LinearProgress />;
  }

  if (getParticipant.isError) throw new Error("participant not found");

  const participant = getParticipant.data!;

  const handleDeleteParticipant = () => {
    deleteParticipant.mutateAsync(participant).then(() => {
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
              changeParticipantGroup.mutate({ participant, group });
            }}
          />
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
        />
      </Toolbar>
      <Divider />
      <Row m={2} p={1} boxShadow={4}>
        {isStarted ? (
          <Text>
            {participant.startedAt &&
              new Date(participant.startedAt).toLocaleDateString("de")}
          </Text>
        ) : (
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
              >
                {t("start study")}
              </Button>
            )}
          </TooltipGuard>
        )}
      </Row>
      <StartStudyDialog
        open={startStudyDialog.isOpen}
        onCancel={startStudyDialog.close}
        onSubmit={({ startDate }) => {
          startStudy.mutateAsync({ participant, startDate }).then(() => {
            startStudyDialog.close();
          });
        }}
      />
    </Page>
  );
};

export default ParticipantPage;

import {
  DeleteDialog,
  Editable,
  IconButton,
  Page,
  Row,
  Text,
  TooltipGuard,
} from "@modules/core/components";
import { useNavigationHelper, useOpen } from "@modules/core/hooks";
import { FormsCard } from "@modules/formConfigs/components";
import { ParticipantsCard } from "@modules/groups/components";
import {
  useDeleteGroup,
  useGetGroup,
  useChangeName,
} from "@modules/groups/hooks";
import { useStudy } from "@modules/studies/contexts";
import { Delete } from "@mui/icons-material";
import { Divider, LinearProgress, Toolbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface GroupPageProps {}

const GroupPage: React.FC<GroupPageProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();
  const getGroup = useGetGroup();
  const updateGroup = useChangeName();
  const deleteGroup = useDeleteGroup();
  const deleteDialog = useOpen();
  const study = useStudy();

  if (getGroup.isLoading) {
    return <LinearProgress />;
  }

  if (getGroup.isError) throw new Error();

  const handleDeleteGroup = () => {
    deleteGroup.mutateAsync(group).then(() => {
      navigate.to("../");
    });
  };

  const group = getGroup.data!;

  return (
    <Page testId="group page" flex={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Editable
          defaultText={group.name}
          onSubmit={(name) => updateGroup.mutate({ id: group.id, name })}
        >
          <Text variant="h6">{group.name}</Text>
        </Editable>
        <TooltipGuard
          validate={{
            "study is active": study.isActive,
            "admin only": study.role !== "admin",
          }}
        >
          {(disabled) => (
            <IconButton
              testId="delete group"
              Icon={<Delete />}
              onClick={deleteDialog.open}
              tooltipProps={{
                title: t("delete record", { record: t("group") }),
              }}
              disabled={disabled}
            />
          )}
        </TooltipGuard>
        <DeleteDialog
          open={deleteDialog.isOpen}
          record="group"
          onConfirm={handleDeleteGroup}
          onCancel={deleteDialog.close}
          target={group.name}
          isLoading={deleteGroup.isLoading}
        />
      </Toolbar>
      <Divider />
      <Row p={2} flex={1} alignItems="stretch" overflowY="hidden">
        <ParticipantsCard group={group} flex={1}  />
        <FormsCard flex={2} ml={2}/>
      </Row>
    </Page>
  );
};

export default GroupPage;

import {
  DataDialog,
  DataList,
  DataListItem,
  Page,
  Text,
} from "@modules/core/components";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
import { DeleteGroupForm, GroupForm } from "@modules/groups/components";
import {
  useCreateGroup,
  useDeleteGroup,
  useGetGroups,
  useUpdateGroup,
} from "@modules/groups/hooks";
import { GroupFormData } from "@modules/groups/types";
import { useGroupId } from "@modules/navigation/hooks";
import { Add } from "@mui/icons-material";
import {
  IconButton,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface GroupsPageProps {}

const GroupsPage: React.FC<GroupsPageProps> = () => {
  const { t } = useTranslation();
  const groupId = useGroupId(false);
  const navigate = useNavigationHelper();
  const editGroupData = useFormData<GroupFormData>();
  const deleteGroupData = useFormData<GroupFormData>();
  const getGroups = useGetGroups();
  const createGroup = useCreateGroup();
  const deleteGroup = useDeleteGroup();
  const updateGroup = useUpdateGroup();

  return (
    <Page testId="groups page" width={200} boxShadow={6} zIndex={900}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", pl: 2 }}>
        <Text variant="h6">{t("groups")}</Text>
        <IconButton
          data-testid="create group button"
          onClick={editGroupData.handleSet({ name: "" })}
        >
          <Add />
        </IconButton>
      </Toolbar>
      <DataList
        client={getGroups}
        disablePadding
        errorText={t("fetch error data", { data: t("groups") })}
        noDataText={t("no data found", { data: t("groups") })}
        renderItem={(group, { isLast }) => (
          <DataListItem
            key={group.id}
            divider={!isLast}
            item={group}
            onUpdate={editGroupData.handleSet(group)}
            onDelete={deleteGroupData.handleSet(group)}
          >
            <ListItemButton
              onClick={navigate.handle(`${group.id}`)}
              selected={groupId === group.id}
            >
              <ListItemText>{group.name}</ListItemText>
            </ListItemButton>
          </DataListItem>
        )}
      />
      <DataDialog
        Form={GroupForm}
        client={editGroupData}
        createTitle={t("create data", { data: t("group") })}
        updateTitle={t("update data", { data: t("group") })}
        onCreate={createGroup.mutateAsync}
        onUpdate={updateGroup.mutateAsync}
      />

      <DataDialog
        Form={DeleteGroupForm}
        client={deleteGroupData}
        mode="delete"
        deleteTitle={t("delete data", { data: t("group") })}
        onDelete={deleteGroup.mutateAsync}
      />
    </Page>
  );
};

export default GroupsPage;

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

export interface GroupsPageProps {}

const GroupsPage: React.FC<GroupsPageProps> = () => {
  const groupId = useGroupId();
  const navigate = useNavigationHelper();
  const editGroupData = useFormData<GroupFormData>();
  const deleteGroupData = useFormData<GroupFormData>();
  const getGroups = useGetGroups();
  const createGroup = useCreateGroup();
  const deleteGroup = useDeleteGroup();
  const updateGroup = useUpdateGroup();

  return (
    <Page testId="groups page" width={200} boxShadow={4}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", pl: 2 }}>
        <Text variant="h6">Gruppen</Text>
        <IconButton
          data-testid="create group button"
          onClick={editGroupData.handleSet({ name: "" })}
        >
          <Add />
        </IconButton>
      </Toolbar>
      <DataList
        client={getGroups}
        errorText="{{ es konnten keine gruppen geladen werden }}"
        noDataText="{{ keine Gruppen angelegt }}"
        renderItem={(group, { isLast }) => (
          <DataListItem
            key={group.id}
            divider={!isLast}
            item={group}
            onUpdate={editGroupData.handleSet(group)}
            onDelete={deleteGroupData.handleSet(group)}
          >
            <ListItemButton
              onClick={navigate.handle(`${group.id}/entities`)}
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
        createTitle="{{ Create Group }}"
        updateTitle="{{ Update Group }}"
        onCreate={createGroup.mutateAsync}
        onUpdate={updateGroup.mutateAsync}
      />

      <DataDialog
        Form={DeleteGroupForm}
        client={deleteGroupData}
        mode="delete"
        deleteTitle="{{ Delete Group }}"
        onDelete={deleteGroup.mutateAsync}
      />
    </Page>
  );
};

export default GroupsPage;

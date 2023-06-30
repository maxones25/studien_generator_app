import {
  Button,
  DataDialog,
  DataList,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData } from "@modules/core/hooks";
import { DeleteGroupForm, GroupForm } from "@modules/groups/components";
import {
  useCreateGroup,
  useDeleteGroup,
  useGetGroups,
  useUpdateGroup,
} from "@modules/groups/hooks";
import { GroupFormData } from "@modules/groups/types";
import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";

export interface GroupsPageProps {}

const GroupsPage: React.FC<GroupsPageProps> = () => {
  const editGroupData = useFormData<GroupFormData>();
  const deleteGroupData = useFormData<GroupFormData>();
  const getGroups = useGetGroups();
  const createGroup = useCreateGroup();
  const deleteGroup = useDeleteGroup();
  const updateGroup = useUpdateGroup();

  return (
    <Page testId="groups page">
      <Row mb={2}>
        <Text variant="h4" pl={2} pr={2}>
          Gruppen
        </Text>
        <Button
          testId="create group button"
          onClick={editGroupData.handleSet({ name: "" })}
        >
          Add
        </Button>
      </Row>
      <DataList
        client={getGroups}
        errorText="{{ es konnten keine gruppen geladen werden }}"
        noDataText="{{ keine Gruppen angelegt }}"
        renderItem={(group, { isLast }) => (
          <ListItem key={group.id} divider={!isLast}>
            <ListItemText>{group.name}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={editGroupData.handleSet(group)}>
                <Edit />
              </IconButton>
              <IconButton onClick={deleteGroupData.handleSet(group)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
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

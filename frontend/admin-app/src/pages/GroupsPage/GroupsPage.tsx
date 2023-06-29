import {
  Button,
  Column,
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
} from "@modules/groups/hooks";
import { GroupFormData } from "@modules/groups/types";
import { Delete, Edit } from "@mui/icons-material";
import {
  Dialog,
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

  const handleSaveGroup = (data: GroupFormData) => {
    if (data.id) {
    } else {
      createGroup.mutate(data);
    }
    editGroupData.reset();
  };

  const handleDeleteGroup = (data: GroupFormData) => {
    deleteGroup.mutate(data);
    deleteGroupData.reset();
  };

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
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton onClick={deleteGroupData.handleSet(group)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      />
      <Dialog open={editGroupData.hasData} onClose={editGroupData.reset}>
        <Column p={2}>
          <Text color="text.secondary">{"{{ Create Group }}"}</Text>
          <GroupForm onSubmit={handleSaveGroup} values={editGroupData.data} />
        </Column>
      </Dialog>
      <Dialog open={deleteGroupData.hasData} onClose={deleteGroupData.reset}>
        <Column p={2}>
          <Text color="text.secondary">{"{{ Delete Group }}"}</Text>
          <DeleteGroupForm
            onSubmit={handleDeleteGroup}
            values={deleteGroupData.data}
          />
        </Column>
      </Dialog>
    </Page>
  );
};

export default GroupsPage;

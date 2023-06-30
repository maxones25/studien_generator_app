import { Column, DataList, Page, Text } from "@modules/core/components";
import { InviteMemberForm } from "@modules/members/components";
import {
  useAddMember,
  useGetDirectors,
  useGetMembers,
  useUpdateMember,
} from "@modules/members/hooks";
import { Director, Member } from "@modules/members/types";
import { useGetStudy } from "@modules/studies/hooks";
import { Remove } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useMemo } from "react";

export interface MembersPageProps {}

const MembersPage: React.FC<MembersPageProps> = () => {
  const getDirectors = useGetDirectors();
  const getMembers = useGetMembers();
  const getStudy = useGetStudy();
  const addMember = useAddMember();
  const updateMember = useUpdateMember();

  const invitableMembers = useMemo<Director[]>(() => {
    if (!getDirectors.data) return [];
    if (!getMembers.data) return [];
    return getDirectors.data.filter((director) =>
      getMembers.data.every((member) => director.id !== member.director.id)
    );
  }, [getDirectors.data, getMembers.data]);

  const handleChangeRole =
    (member: Member) => (e: SelectChangeEvent<string>) => {
      const role = e.target.value;
      updateMember.mutate({ role, directorId: member.director.id });
    };

  const isAdmin = getStudy.data?.role === "admin";

  return (
    <Page testId="members page">
      {isAdmin && (
        <Column mb={2}>
          <Text variant="h6">{"{{ Invite Member }}"}</Text>
          <InviteMemberForm
            formProps={{ p: 1 }}
            onSubmit={addMember.mutate}
            values={{ directorId: "", role: "employee" }}
            directors={invitableMembers}
          />
        </Column>
      )}
      <Column>
        <Text variant="h4" sx={{ mb: 2 }}>
          {"{{ Members }}"}
        </Text>
        <DataList
          client={getMembers}
          errorText="error"
          noDataText="no data"
          renderItem={(member, { isLast }) => (
            <ListItem key={member.director.id} divider={!isLast} disablePadding>
              <ListItemText
                primary={`${member.director.firstName} ${member.director.lastName}`}
                secondary={member.director.email}
              />
              <FormControl margin="normal">
                <Select
                  size="small"
                  value={member.role}
                  sx={{ minWidth: 150 }}
                  onChange={handleChangeRole(member)}
                  readOnly={!isAdmin}
                >
                  <MenuItem value="admin">Administrator</MenuItem>
                  <MenuItem value="employee">Mitarbeiter</MenuItem>
                </Select>
              </FormControl>
              <FormControl margin="normal" sx={{ ml: 1 }}>
                <IconButton color="error">
                  <Remove />
                </IconButton>
              </FormControl>
            </ListItem>
          )}
        />
      </Column>
    </Page>
  );
};

export default MembersPage;

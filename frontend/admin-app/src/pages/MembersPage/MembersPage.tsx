import {
  Column,
  DataList,
  IconButton,
  Page,
  Text,
} from "@modules/core/components";
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
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
} from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface MembersPageProps {}

const MembersPage: React.FC<MembersPageProps> = () => {
  const { t } = useTranslation();
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
    <Page testId="members page" ml={2} flex={1} maxWidth="50%">
      <Toolbar></Toolbar>
      <Column mb={2}>
        <Text variant="h6">{t("add data", { data: t("member") })}</Text>
        <InviteMemberForm
          isAdmin={isAdmin}
          onSubmit={addMember.mutate}
          values={{ directorId: "", role: "employee" }}
          directors={invitableMembers}
        />
      </Column>
      <Column>
        <Text variant="h4" sx={{ mb: 2 }}>
          {t("members")}
        </Text>
        <DataList
          client={getMembers}
          errorText={t("fetch error data", { data: t("members") })}
          noDataText={t("no data found", { data: t("members") })}
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
                  <MenuItem value="admin">{t("admin")}</MenuItem>
                  <MenuItem value="employee">{t("member")}</MenuItem>
                </Select>
              </FormControl>
              <FormControl margin="normal" sx={{ ml: 1 }}>
                <IconButton
                  testId="remove member button"
                  color="error"
                  disabled={!isAdmin}
                  Icon={<Remove />}
                />
              </FormControl>
            </ListItem>
          )}
        />
      </Column>
    </Page>
  );
};

export default MembersPage;

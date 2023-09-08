import {
  Column,
  ColumnProps,
  DataList,
  IconButton,
  OnlyAdmin,
  Row,
  Text,
} from "@modules/core/components";
import {
  useGetMembers,
  useChangeMemberRole,
  useRemoveMember,
} from "@modules/members/hooks";
import { Member } from "@modules/members/types";
import { Remove } from "@mui/icons-material";
import {
  FormControl,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface MembersCardProps extends ColumnProps {}

export const MembersCard: React.FC<MembersCardProps> = (props) => {
  const { t } = useTranslation();
  const getMembers = useGetMembers();
  const updateMember = useChangeMemberRole();
  const removeMember = useRemoveMember();

  const handleChangeRole =
    (member: Member) => (e: SelectChangeEvent<string>) => {
      const role = e.target.value;
      updateMember.mutate({ role, directorId: member.director.id });
    };

  return (
    <Column {...props} overflowY="hidden">
      <Text variant="h6" sx={{ mb: 2 }}>
        {t("members")}
      </Text>
      <DataList
        client={getMembers}
        errorText={t("fetch error data", { data: t("members") })}
        noDataText={t("no data found", { data: t("members") })}
        renderItem={(member, { isLast }) => {
          const displayName = `${member.director.firstName} ${member.director.lastName}`;
          return (
            <ListItem key={member.director.id} divider={!isLast} disablePadding>
              <ListItemText
                primary={displayName}
                secondary={member.director.email}
              />
              <Row ml={2}>
                <FormControl margin="normal">
                  <OnlyAdmin>
                    {({ disabled }) => (
                      <Select
                        size="small"
                        value={member.role}
                        sx={{ minWidth: 150 }}
                        onChange={handleChangeRole(member)}
                        readOnly={disabled}
                        data-testid={`select ${displayName} role`}
                      >
                        <MenuItem
                          value="employee"
                          data-testid={`select ${displayName} role option employee`}
                        >
                          {t("member")}
                        </MenuItem>
                        <MenuItem
                          data-testid={`select ${displayName} role option admin`}
                          value="admin"
                        >
                          {t("admin")}
                        </MenuItem>
                      </Select>
                    )}
                  </OnlyAdmin>
                </FormControl>
                <FormControl margin="normal" sx={{ ml: 1 }}>
                  <OnlyAdmin>
                    {({ disabled }) => (
                      <IconButton
                        testId={`remove member ${displayName}`}
                        color="error"
                        disabled={disabled}
                        Icon={<Remove />}
                        onClick={() => {
                          removeMember.mutate(member);
                        }}
                      />
                    )}
                  </OnlyAdmin>
                </FormControl>
              </Row>
            </ListItem>
          );
        }}
      />
    </Column>
  );
};

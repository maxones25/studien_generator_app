import {
  Column,
  ColumnProps,
  DataList,
  Row,
  Text,
} from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import { Group } from "@modules/groups/types";
import { useGetGroupParticipants } from "@modules/participants/hooks";
import { Divider, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface ParticipantsCardProps extends ColumnProps {
  group: Group;
}

export const ParticipantsCard: React.FC<ParticipantsCardProps> = ({
  group,
  ...props
}) => {
  const { t } = useTranslation();
  const getParticipants = useGetGroupParticipants(group.id);
  const navigate = useNavigationHelper()

  return (
    <Column boxShadow={4} {...props}>
      <Row p={2} justifyContent="space-between" height={40}>
        <Text>{t("participants")}</Text>
      </Row>
      <Divider/>
      <Column p={2} pt={1} pb={1}>
        <DataList
          client={getParticipants}
          errorText=""
          noDataText=""
          renderItem={(participant, { isLast }) => (
            <ListItemButton key={participant.id} divider={!isLast} onClick={navigate.handle(`../../participants/${participant.id}`)}>
              <ListItemText>{participant.number}</ListItemText>
            </ListItemButton>
          )}
        />
      </Column>
    </Column>
  );
};

import { Page, Row, Text } from "@modules/core/components";
import { FormsCard } from "@modules/groups/components";
import { useGetGroup } from "@modules/groups/hooks";
import { Divider, Toolbar } from "@mui/material";
import React from "react";

export interface GroupPageProps {}

const GroupPage: React.FC<GroupPageProps> = () => {
  const getGroup = useGetGroup();
  return (
    <Page testId="group page" flex={1}>
      <Toolbar>
        <Text variant="h6">{getGroup.data?.name}</Text>
      </Toolbar>
      <Divider/>
      <Row p={2} flex={1} alignItems="stretch">
        <FormsCard />
      </Row>
    </Page>
  );
};

export default GroupPage;

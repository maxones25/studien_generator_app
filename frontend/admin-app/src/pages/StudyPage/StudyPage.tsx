import { Column, Page, Row, Text } from "@modules/core/components";
import { AddMemberCard, MembersCard } from "@modules/members/components";
import { MembersProvider } from "@modules/members/contexts";
import { StudyCard } from "@modules/studies/components";
import { useStudy } from "@modules/studies/contexts";
import { Divider, Toolbar } from "@mui/material";
import React from "react";

export interface StudyPageProps {}

const StudyPage: React.FC<StudyPageProps> = () => {
  const study = useStudy();

  return (
    <Page testId="study page" flex={1}>
      <Toolbar>
        <Text variant="h6">{study.name}</Text>
      </Toolbar>
      <Divider />
      <Column flex={1} overflowY="hidden">
        <StudyCard study={study} />
        <Row flex={1} alignItems="stretch" overflowY="hidden">
          <Column m={2} mt={0} p={2} boxShadow={4} overflowY="hidden">
            <MembersProvider>
              <AddMemberCard />
              <MembersCard flex={1} />
            </MembersProvider>
          </Column>
        </Row>
      </Column>
    </Page>
  );
};

export default StudyPage;

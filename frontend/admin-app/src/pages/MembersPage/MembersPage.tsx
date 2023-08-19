import { Page } from "@modules/core/components";
import { AddMemberCard, MembersCard } from "@modules/members/components";
import { MembersProvider } from "@modules/members/contexts";
import { Toolbar } from "@mui/material";
import React from "react";

export interface MembersPageProps {}

const MembersPage: React.FC<MembersPageProps> = () => {
  return (
    <Page testId="members page" ml={2} flex={1} maxWidth="50%">
      <MembersProvider>
        <Toolbar></Toolbar>
        <AddMemberCard />
        <MembersCard />
      </MembersProvider>
    </Page>
  );
};

export default MembersPage;

import { Column, ColumnProps } from "@modules/core/components";
import {
  AddMemberCard,
  MembersCard as MembersList,
} from "@modules/members/components";
import { MembersProvider } from "@modules/members/contexts";
import React from "react";

export interface MembersCardProps extends ColumnProps {}

export const MembersCard: React.FC<MembersCardProps> = (props) => {
  return (
    <Column boxShadow={4} overflowY="hidden" {...props}>
      <MembersProvider>
        <AddMemberCard />
        <MembersList flex={1} />
      </MembersProvider>
    </Column>
  );
};

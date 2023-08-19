import { Column, Text } from "@modules/core/components";
import { useAddMember, useGetNonStudyMembers } from "@modules/members/hooks";
import { useTranslation } from "react-i18next";
import { InviteMemberForm } from "..";

export interface AddMemberCardProps {}

export const AddMemberCard: React.FC<AddMemberCardProps> = () => {
  const { t } = useTranslation();
  const addMember = useAddMember();

  const getNonStudyMembers = useGetNonStudyMembers();

  return (
    <Column mb={2}>
      <Text variant="h6">{t("add data", { data: t("member") })}</Text>
      <InviteMemberForm
        onSubmit={addMember.mutate}
        values={{ directorId: "", role: "employee" }}
        directors={getNonStudyMembers.data ?? []}
      />
    </Column>
  );
};

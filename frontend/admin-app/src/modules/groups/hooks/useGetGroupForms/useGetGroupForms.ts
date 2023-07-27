import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";

export const getGetGroupFormsKey = (data: {
  studyId: string;
  groupId?: string;
}) => ["getGroupForms", data];

export const useGetGroupForms = () => {
  const studyId = useStudyId();
  const groupId = useGroupId();

  return useReadRequest<FormConfig[]>(
    getGetGroupFormsKey({ studyId, groupId }),
    (options) =>
      apiRequest(`/studies/${studyId}/groups/${groupId}/forms`, { ...options })
  );
};

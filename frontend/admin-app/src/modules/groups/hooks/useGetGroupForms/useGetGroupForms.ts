import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";

export interface UseGetGroupFormsOptions {
  groupId: string;
}

export const getGetGroupFormsKey = (data: {
  studyId: string;
  groupId: string;
}) => ["getGroupForms", data];

export const useGetGroupForms = ({ groupId }: UseGetGroupFormsOptions) => {
  const studyId = useStudyId();

  return useReadRequest<FormConfig[]>(
    getGetGroupFormsKey({
      studyId: studyId!,
      groupId,
    }),
    ({ ...options }) =>
      apiRequest(`/studies/${studyId}/groups/${groupId}/forms`, {
        ...options,
      })
  );
};

import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";

export interface UseGetGroupFormsOptions {
  groupId: string;
}

export const getGetGroupFormsKey = (deps: {
  studyId: string;
  groupId: string;
}) => ["getGroupForms", deps];

export const useGetGroupForms = ({ groupId }: UseGetGroupFormsOptions) => {
  const studyId = useStudyId()!;

  return useReadRequest<FormConfig[]>(
    getGetGroupFormsKey({
      studyId,
      groupId,
    }),
    ({ ...options }) =>
      apiRequest(`/forms/getByGroup`, {
        ...options,
        params: {
          studyId,
          groupId,
        },
      })
  );
};

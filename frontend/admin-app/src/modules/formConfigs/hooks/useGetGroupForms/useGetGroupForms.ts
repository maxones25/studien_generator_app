import { generateQueryKey, useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Config } from "@modules/formConfigs/types";
import { FormConfigTypeType } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";

export interface UseGetGroupFormsOptions {
  groupId: string;
  type?: FormConfigTypeType;
  isActive?: boolean;
}

export const getGetGroupFormsKey = generateQueryKey<{
  studyId: string;
  groupId: string;
  type?: FormConfigTypeType;
  isActive?: boolean;
}>("getGroupForms");

export const useGetGroupForms = ({
  groupId,
  isActive,
  type,
}: UseGetGroupFormsOptions) => {
  const studyId = useStudyId()!;

  return useReadRequest<Config[]>(
    getGetGroupFormsKey({
      studyId,
      groupId,
      isActive,
      type,
    }),
    ({ ...options }) =>
      apiRequest(`/forms/getByGroup`, {
        ...options,
        params: {
          studyId,
          groupId,
          isActive,
          type,
        },
      })
  );
};

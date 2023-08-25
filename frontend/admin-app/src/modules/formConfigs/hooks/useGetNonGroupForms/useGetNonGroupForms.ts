import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Form } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";

export const getGetNonGroupFormsKey = (deps: {
  studyId: string;
  groupId: string;
}) => ["getNonGroupForms", deps];

export const useGetNonGroupForms = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useReadRequest<Form[]>(
    getGetNonGroupFormsKey({ studyId, groupId }),
    (options) =>
      apiRequest(`/forms/getNonGroup`, {
        ...options,
        params: { studyId, groupId },
      })
  );
};

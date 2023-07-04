import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Field } from "@modules/fields/types";
import { useEntityId, useGroupId, useStudyId } from "@modules/navigation/hooks";

export const getGetFieldsKey = ({
  groupId,
  entityId,
}: {
  groupId?: string;
  entityId?: string;
}) => ["getFields", { entityId, groupId }];

export const useGetFields = () => {
  const studyId = useStudyId();
  const groupId = useGroupId();
  const entityId = useEntityId();

  return useReadRequest<Field[]>(
    getGetFieldsKey({ groupId, entityId }),
    (options) =>
      apiRequest(`/studies/${studyId}/entities/${entityId}/fields`, {
        ...options,
        params: {
          groupId: groupId !== "all" ? groupId : undefined,
        },
      })
  );
};

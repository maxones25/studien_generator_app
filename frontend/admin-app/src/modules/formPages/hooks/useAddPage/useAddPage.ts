import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetPagesKey } from "..";
import { useTranslation } from "react-i18next";

export const useAddPage = () => {
  const { t } = useTranslation();
  const studyId = useStudyId()!;
  const formId = useFormId()!;

  return useWriteRequest<unknown, { id: string; number: number }>(
    ({ headers }) =>
      apiRequest(`/forms/addPage`, {
        method: "POST",
        headers,
        params: { studyId, formId },
      }),
    {
      onSuccess: ({ queryClient, data: { number } }) => {
        queryClient.invalidateQueries(getGetPagesKey({ formId, studyId }));
        return {
          text: "record created",
          params: {
            record: "page",
            name: t("page x", { number }),
          },
        };
      },
    }
  );
};

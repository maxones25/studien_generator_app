import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormPage } from "@modules/formPages/types";
import { getGetPagesKey } from "..";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { useTranslation } from "react-i18next";

export const useRemovePage = () => {
  const { t } = useTranslation();
  const studyId = useStudyId()!;
  const formId = useFormId()!;

  return useWriteRequest<FormPage, number>(
    ({ body: { id: pageId }, ...options }) =>
      apiRequest(`/forms/removePage`, {
        ...options,
        method: "POST",
        params: { studyId, pageId },
      }),
    {
      onSuccess: ({ queryClient, variables: { number } }) => {
        queryClient.invalidateQueries(getGetPagesKey({ formId, studyId }));
        return {
          text: "record deleted",
          params: {
            record: "page",
            name: t("page x", { number }),
          },
        };
      },
    }
  );
};

import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetFormPagesKey } from "..";
import { useTranslation } from "react-i18next";

export const useAddFormPage = () => {
  const { t } = useTranslation();
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<any, { id: string; number: number }>(
    ({ headers }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/pages`, {
        method: "POST",
        headers,
      }),
    {
      onSuccess: ({ queryClient, data: { number } }) => {
        queryClient.invalidateQueries(
          getGetFormPagesKey({ formId: formId!, studyId: studyId! })
        );
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

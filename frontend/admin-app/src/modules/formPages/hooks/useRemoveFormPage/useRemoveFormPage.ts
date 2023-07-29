import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormPage } from "@modules/formPages/types";
import { getGetFormPagesKey } from "..";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { useTranslation } from "react-i18next";

export const useRemoveFormPage = () => {
  const { t } = useTranslation();
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<FormPage, number>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/pages/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess: ({ queryClient, variables: { number } }) => {
        queryClient.invalidateQueries(
          getGetFormPagesKey({ formId: formId!, studyId: studyId! })
        );
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

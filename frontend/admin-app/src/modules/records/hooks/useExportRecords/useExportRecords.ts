import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { RecordsManagerState, TableColumn } from "@modules/records/components";

type Input = Omit<RecordsManagerState, "columns"> & { columns: TableColumn[] };

export const useExportRecords = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Input, string>((options) =>
    apiRequest(`/records/export`, {
      ...options,
      method: "POST",
      params: { studyId },
    })
  );
};

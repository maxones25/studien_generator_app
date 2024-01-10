import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { LoginData, StartStudyFormData } from "@modules/participants/types";
import { getGetAppointmentsKey, getGetParticipantKey, getGetParticipantsKey, getGetTasksKey } from "..";

export const useStartStudy = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<StartStudyFormData, LoginData>(
    ({ body: { participant, ...body }, ...options }) =>
      apiRequest(`/participants/startStudy`, {
        ...options,
        method: "POST",
        params: { studyId, participantId: participant.id },
        body,
      }),
    {
      onSuccess({ queryClient, variables: { participant, startDate } }) {
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: false })
        );
        queryClient.invalidateQueries(
          getGetParticipantKey({ participantId: participant.id })
        );
        queryClient.invalidateQueries(
          getGetAppointmentsKey({ studyId, participantId:participant.id })
        );
        queryClient.invalidateQueries(
          getGetTasksKey({ studyId, participantId:participant.id })
        );
        
        return {
          text: "record started",
          params: {
            record: "participant",
            name: participant.number,
            date: new Date(startDate).toLocaleDateString("de"),
          },
        };
      },
    }
  );
};

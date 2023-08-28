import { FormProps } from "@modules/core/types";
import { Participant, StartStudyFormData } from "@modules/participants/types";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { StartStudyStepper } from "..";
import { useGetGroupForms } from "@modules/formConfigs/hooks";

export interface StartStudyDialogProps extends FormProps<StartStudyFormData> {
  open: boolean;
  participant: Participant;
}

export const StartStudyDialog: React.FC<StartStudyDialogProps> = ({
  open,
  participant,
  onSubmit,
  onCancel,
}) => {
  const getForms = useGetGroupForms({
    groupId: participant.group?.id!,
    isActive: true,
    type: "TimeDependent",
  });

  if (!getForms.data) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Studie starten</DialogTitle>
      <DialogContent>
        <StartStudyStepper
          onSubmit={({ configs, startDate }) => {
            onSubmit({ participant, startDate, configs });
          }}
          configs={getForms.data!}
        />
      </DialogContent>
    </Dialog>
  );
};

import { formatTime } from "@modules/appointments/utils";
import {
  Column,
  ColumnProps,
  DataList,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { Add } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { AppointmentForm } from "..";
import { useTranslation } from "react-i18next";
import {
  UseReadRequestResult,
  UseWriteRequestResult,
  useFormData,
} from "@modules/core/hooks";
import { Appointment, AppointmentFormData } from "@modules/appointments/types";

export interface AppointmentsCardProps extends ColumnProps {
  readClient: UseReadRequestResult<Appointment[]>;
  createClient: UseWriteRequestResult<AppointmentFormData, string>;
}

export const AppointmentsCard: React.FC<AppointmentsCardProps> = ({
  createClient,
  readClient,
  ...props
}) => {
  const { t } = useTranslation();
  const createData = useFormData<AppointmentFormData>();

  return (
    <Column boxShadow={4} {...props}>
      <Row p={2} justifyContent="space-between">
        <Text>{t("appointments")}</Text>
        <IconButton
          Icon={<Add />}
          testId="open add appointment dialog"
          onClick={createData.handleSet({
            endDate: "",
            endTime: "",
            startDate: "",
            startTime: "",
            subject: "",
          })}
        />
      </Row>
      <Divider />
      <DataList
        client={readClient}
        errorText=""
        noDataText=""
        renderItem={(appointment) => (
          <ListItem key={appointment.id} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={appointment.subject}
                secondary={formatTime(appointment)}
              />
            </ListItemButton>
          </ListItem>
        )}
      />
      <Dialog open={createData.hasData} onClose={createData.reset}>
        <DialogContent>
          <AppointmentForm
            values={createData.data}
            onSubmit={(data) => {
              createClient.mutateAsync(data).then(() => {
                createData.reset();
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </Column>
  );
};

import { formatTime } from "@modules/appointments/utils";
import {
  Column,
  ColumnProps,
  DataList,
  DataListItem,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { Add } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Divider,
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
import { useDeleteAppointment } from "@modules/studies/hooks";

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
  const deleteAppointment = useDeleteAppointment();

  const handleDeleteAppointment= async (data: Appointment) => {
    await deleteAppointment.mutateAsync(data);
  };

  return (
    <Column testId="appointments card" boxShadow={4} {...props}>
      <Row p={2} justifyContent="space-between">
        <Text>{t("appointments")}</Text>
        <IconButton
          Icon={<Add />}
          testId="add appointment"
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
        filter={(item) => item.deletedAt == undefined}
        renderItem={(appointment, { isLast }) => (
          <DataListItem
            key={appointment.id}
            divider={!isLast}
            item={appointment}
            onDelete={handleDeleteAppointment}
            >
              <ListItemButton>
                <ListItemText
                  primary={appointment.subject}
                  secondary={formatTime(appointment)}
                />
              </ListItemButton>

          </DataListItem>
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

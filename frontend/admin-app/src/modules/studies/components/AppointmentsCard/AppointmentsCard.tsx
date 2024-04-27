import React from "react";
import {
  Column,
  ColumnProps,
  DataList,
  DataListItem,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import {
  useCreateAppointment,
  useDeleteAppointment,
  useGetAppointments,
} from "@modules/studies/hooks";
import {
  Dialog,
  DialogContent,
  Divider,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import { useFormData } from "@modules/core/hooks";
import { Appointment, AppointmentFormData } from "@modules/appointments/types";
import { AppointmentForm } from "@modules/appointments/components";
import { formatTime } from "@modules/appointments/utils";

export interface AppointmentsCardProps extends ColumnProps {}

export const AppointmentsCard: React.FC<AppointmentsCardProps> = (props) => {
  const { t } = useTranslation();
  const getAppointments = useGetAppointments();
  const createAppointment = useCreateAppointment();
  const createData = useFormData<AppointmentFormData>();
  const deleteAppointment = useDeleteAppointment();

  const handleDeleteAppointment= async (data: Appointment) => {
    await deleteAppointment.mutateAsync(data);
  };

  return (
    <Column boxShadow={4} m={2} ml={0} mt={0} {...props}>
      <Row p={2} pt={1} pb={1} justifyContent="space-between">
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
        client={getAppointments}
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
              createAppointment.mutateAsync(data).then(() => {
                createData.reset();
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </Column>
  );
};

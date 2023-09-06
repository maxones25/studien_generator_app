import React from "react";
import {
  Column,
  ColumnProps,
  DataList,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import {
  useCreateAppointment,
  useGetAppointments,
} from "@modules/studies/hooks";
import {
  Dialog,
  DialogContent,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import { useFormData } from "@modules/core/hooks";
import { AppointmentFormData } from "@modules/appointments/types";
import { AppointmentForm } from "@modules/appointments/components";
import { formatTime } from "@modules/appointments/utils";

export interface AppointmentsCardProps extends ColumnProps {}

export const AppointmentsCard: React.FC<AppointmentsCardProps> = (props) => {
  const { t } = useTranslation();
  const getAppointments = useGetAppointments();
  const createAppointment = useCreateAppointment();
  const createData = useFormData<AppointmentFormData>();

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

import { Appointment } from ".."

type FormData<T> = Omit<T, "id"> & { id?: string }

export type AppointmentFormData = FormData<Appointment>
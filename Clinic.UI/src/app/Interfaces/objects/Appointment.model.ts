import { Status } from "./Status.model";

export interface Appointment{
    appointmentAt: string;
    doctor: string;
    patient: string;
    status: Status;
  }
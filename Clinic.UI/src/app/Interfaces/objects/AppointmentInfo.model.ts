import { Status } from "./Status.model";
import { UserForManagement } from "./UserForManagement.model";

export interface AppointmentInfo{
    id: string;
    appointmentAt: string;
    doctor: UserForManagement;
    patient: UserForManagement;
    status: Status;
}
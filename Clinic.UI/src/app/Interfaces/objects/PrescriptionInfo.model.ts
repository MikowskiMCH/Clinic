import { AppointmentInfo } from "./AppointmentInfo.model";
import { UserForManagement } from "./UserForManagement.model";

export interface PrescriptionInfo{
    description: string;
    medicines: string;
    appointment: AppointmentInfo;
    wroteBy: UserForManagement;
}
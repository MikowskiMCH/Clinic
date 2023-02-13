import { UserForManagement } from "./UserForManagement.model";

export interface RoomForManagement{
    id: string;
    number: string;
    doctor: UserForManagement;
    nurse: UserForManagement;
    specjalization: string;
}
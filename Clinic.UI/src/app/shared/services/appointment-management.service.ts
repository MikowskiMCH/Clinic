import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/app/Interfaces/objects/Appointment.model';
import { AppointmentInfo } from 'src/app/Interfaces/objects/AppointmentInfo.model';
import { PrescriptionInfo } from 'src/app/Interfaces/objects/PrescriptionInfo.model';
import { RoomForManagement } from 'src/app/Interfaces/objects/RoomForManagement.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentManagementService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  getAppointments = (route: string) =>{ 
    return this.http.get(this.createCompliteRoute(route, this.envUrl.urlAddress));
  }

  acceptAppointment = (route: string, body: AppointmentInfo) =>{ 
    return this.http.post<AppointmentInfo>(this.createCompliteRoute(route, this.envUrl.urlAddress), body);
  }
  getRoom = (route: string) =>{
    return this.http.get<RoomForManagement>(this.createCompliteRoute(route, this.envUrl.urlAddress));
  }

  getPrescriptions = (route: string) =>{ 
    return this.http.get(this.createCompliteRoute(route, this.envUrl.urlAddress));
  }

  createAppointment = (route: string, body: Appointment) =>{ 
    return this.http.post(this.createCompliteRoute(route, this.envUrl.urlAddress), body);
  }

  createPrescription = (route: string, body: PrescriptionInfo) =>{ 
    return this.http.post(this.createCompliteRoute(route, this.envUrl.urlAddress), body);
  }

  createCompliteRoute = (route: string, envAddres:string) =>{
    return `${envAddres}/${route}`;
  }
}

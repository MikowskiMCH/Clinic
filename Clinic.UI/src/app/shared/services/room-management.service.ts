import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecjalizationSender } from 'src/app/admin-panel/room-panel/room-management/room-management.component';
import { RoomForManagement } from 'src/app/Interfaces/objects/RoomForManagement.model';
import { UserForManagement } from 'src/app/Interfaces/objects/UserForManagement.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getRoomData = (route: string) =>{
    return this.http.get<RoomForManagement[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public deleteRoom = (route: string) =>{
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public createRoom = (route: string) =>{
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), null);
  }

  public setEmpty = (route: string) =>{
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), null);
  }

  public getEmployeeName = (route: string) =>{
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public sendSpecjalization = (route: string, spec: SpecjalizationSender) =>{
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), spec);
  }

  public AssignEmployeeForRoom = (route: string, body: UserForManagement) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  private createCompleteRoute = (route: string, envAddress: string)=>{
    return `${envAddress}/${route}`;
  }
}

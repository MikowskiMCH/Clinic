import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForManagement } from 'src/app/Interfaces/objects/UserForManagement.model';
import { UserForRoleChange } from 'src/app/Interfaces/objects/UserForRoleChange.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getAllUsers = (route: string) =>{
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public changeUserRole = (route: string, newUserRole: UserForRoleChange) =>{
    return this.http.post<UserForRoleChange>(this.createCompleteRoute(route, this.envUrl.urlAddress), newUserRole);
  }

  public getAllInRole = (route: string) =>{
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress))
  }

  public deleteUser = (route: string) =>{
    return this.http.delete<UserForManagement>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string)=>{
    return `${envAddress}/${route}`
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'src/app/Interfaces/authentication/login/LoginResponse.model';
import { UserForLogin } from 'src/app/Interfaces/authentication/login/UserForLogin.model';
import { UserForRegister } from 'src/app/Interfaces/authentication/register/UserForRegister.model';
import { EnvironmentUrlService } from './environment-url.service';
import { Subject } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt';
import { ForgotPassword } from 'src/app/Interfaces/authentication/login/ForgotPassword.model';
import { ResetPassword } from 'src/app/Interfaces/authentication/login/ResetPassword.model';
import { ChangePassword } from 'src/app/Interfaces/authentication/management/ChangePassword.model';
import { ChangeEmail } from 'src/app/Interfaces/authentication/management/ChangeEmail.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private jwtHandler: JwtHelperService) { }

  public isUserAuthenticated = (): boolean =>{
    const token = localStorage.getItem("token");

    return token && !this.jwtHandler.isTokenExpired(token);
  }

  public isAdmin = () =>{
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHandler.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role === 'Admin';
  }

  public isDoctor = () =>{
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHandler.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role === 'Doctor';
  }

  public isNurse = () =>{
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHandler.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role === 'Nurse';
  }

  public isPatient = () =>{
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHandler.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role === 'Patient';
  }

  public authState = (isAuthenticated: boolean)=>{
    this.authChangeSub.next(isAuthenticated);
  }

  public logout = () =>{
    localStorage.removeItem("token");
    this.authState(false);
  }
  public changePassword = (route: string, body: ChangePassword) =>{
    return this.http.post<ChangePassword>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  public changeEmail = (route: string, body: ChangeEmail) =>{
    return this.http.post<ChangeEmail>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  public forgotPassword = (route:string, body: ForgotPassword) =>{
    return this.http.post<ForgotPassword>(this.createCompleteRoute(route, this.envUrl.urlAddress), body)
  }

  public resetPassword = (route: string, body: ResetPassword) =>{
    return this.http.post<ResetPassword>(this.createCompleteRoute(route, this.envUrl.urlAddress), body)
  }

  public registerUser = (route: string, body: UserForRegister) =>{
    return this.http.post<UserForRegister>(this.createCompleteRoute(route, this.envUrl.urlAddress), body)
  }

  public loginUser = (route: string, body: UserForLogin) =>{
    return this.http.post<LoginResponse>(this.createCompleteRoute(route, this.envUrl.urlAddress), body)
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}

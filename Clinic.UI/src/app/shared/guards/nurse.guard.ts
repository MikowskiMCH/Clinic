import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NurseGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if(this.authService.isNurse()){
      return true;
    }

    this.router.navigate(['/not-allowed'], {queryParams: {returnUrl: state.url}})
  }
  
}

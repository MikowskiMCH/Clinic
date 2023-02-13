import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MatSidenav } from '@angular/material/sidenav';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { ProfileManagementComponent } from '../profile-management/profile-management.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  role: string;
  adminPanelDrop: boolean = false;
  @ViewChild('drawer') public drawer: MatSidenav;
  public isAuthenticated: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private dialog: MatDialog,private breakpointObserver: BreakpointObserver, private router: Router, private authService: AuthenticationService, private jwtService: JwtHelperService) {
    this.authService.authChanged
    .subscribe(res => {
      this.isAuthenticated = res;
      
      if(res == true){
        const token = localStorage.getItem('token');
        const decodedToken = this.jwtService.decodeToken(token);
        this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      }
    });
  }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res =>{
      this.isAuthenticated = res;
    });
  }

  public openManageProfileDialog = () =>{
    const dialogRef = this.dialog.open(ProfileManagementComponent);
  }

  public logout = () =>{
    this.authService.logout();
    this.router.navigate(['/authentication/login'])
  }

  public homeRedirect = (state: boolean) =>{
    if(state)
    {
      this.router.navigate(['/home'])
    }
    else{
      this.router.navigate(['/'])
    }
  }
}

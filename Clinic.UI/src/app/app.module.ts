import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { JwtModule } from "@auth0/angular-jwt";
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NurseGuard } from './shared/guards/nurse.guard';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NotAllowedComponent,
    WelcomeComponent,
    ProfileManagementComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7171"],
        disallowedRoutes:[
        ]
      }
    }),
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatTreeModule,
    HttpClientModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(f => f.AuthenticationModule)},
      {path: 'admin-panel', loadChildren: () => import('./admin-panel/admin-panel.module').then(f => f.AdminPanelModule), canActivate: [AuthGuard, AdminGuard]},
      {path: 'patient-panel', loadChildren: () => import('./patient-panel/patient-panel.module').then(f=>f.PatientPanelModule), canActivate: [AuthGuard]},
      {path: 'nurse-panel', loadChildren: () => import('./nurse-panel/nurse-panel.module').then(f=>f.NursePanelModule), canActivate: [AuthGuard, NurseGuard]},
      {path: 'not-allowed', component: NotAllowedComponent},
      {path: '', component: WelcomeComponent},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'home-dialog', loadChildren: () => import('./home-dialog/home-dialog.module').then(f=>f.HomeDialogModule), canActivate: [AuthGuard]}
    ]),
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

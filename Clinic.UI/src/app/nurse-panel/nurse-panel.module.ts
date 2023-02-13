import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientPrescriptionDialogComponent } from './patient-prescription-dialog/patient-prescription-dialog.component';
import { PatientPrescriptionsDialogComponent } from '../home-dialog/patient-prescriptions-dialog/patient-prescriptions-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PatientInfoComponent,
    PatientAppointmentsComponent,
    PatientPrescriptionDialogComponent
  ],
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    RouterModule.forChild([
      {path:'patients-info', component: PatientInfoComponent},
      {path:'patient-appointments', component: PatientAppointmentsComponent},
      {path:'patient-prescription', component: PatientPrescriptionsDialogComponent},
    ])
  ]
})
export class NursePanelModule { }

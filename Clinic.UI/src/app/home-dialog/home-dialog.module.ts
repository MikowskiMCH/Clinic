import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientInfoDialogComponent } from './patient-info-dialog/patient-info-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PatientPrescriptionsDialogComponent } from './patient-prescriptions-dialog/patient-prescriptions-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PrescriptionAddDialogComponent } from './prescription-add-dialog/prescription-add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    PatientInfoDialogComponent,
    PatientPrescriptionsDialogComponent,
    PrescriptionAddDialogComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      {path:'patient-info-dialog', component: PatientInfoDialogComponent}
    ])
  ]
})
export class HomeDialogModule { }

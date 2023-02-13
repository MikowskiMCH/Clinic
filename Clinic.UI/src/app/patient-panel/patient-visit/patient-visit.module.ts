import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitDoctorSelectionComponent } from './visit-doctor-selection/visit-doctor-selection.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MakeVisitComponent } from './make-visit/make-visit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    VisitDoctorSelectionComponent,
    MakeVisitComponent
  ],  
  imports: [
    MatRadioModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      {path: 'select-doctor', component: VisitDoctorSelectionComponent},
      {path: 'make-visit', component: MakeVisitComponent},
    ])
  ]
})
export class PatientVisitModule { }

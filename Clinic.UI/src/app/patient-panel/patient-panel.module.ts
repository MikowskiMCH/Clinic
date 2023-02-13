import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    CommonModule,
    RouterModule.forChild([
      {path:'patient-visit', loadChildren: ()=> import('./patient-visit/patient-visit.module').then(f => f.PatientVisitModule)},
    ])
  ]
})
export class PatientPanelModule { }

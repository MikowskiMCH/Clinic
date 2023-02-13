import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientInfo } from 'src/app/Interfaces/objects/PatientInfo.model';
import { AppointmentManagementService } from 'src/app/shared/services/appointment-management.service';

@Component({
  selector: 'app-patient-info-dialog',
  templateUrl: './patient-info-dialog.component.html',
  styleUrls: ['./patient-info-dialog.component.css']
})
export class PatientInfoDialogComponent {
  patient: PatientInfo;
  showAllergies: boolean = false;
  constructor(public dialogRef: MatDialogRef<PatientInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private appointmentService: AppointmentManagementService){
    this.getPatientInfo();
  }

  allergiesResponse = () =>{
    if(this.patient.allergies! = ''){
      this.showAllergies == true;
    }
  }

  getPatientInfo = () =>{
    this.appointmentService.getAppointments(`api/Appointment/GetPatientInfo/${this.data}`).subscribe(res=>{
      this.patient = res as PatientInfo;
    })
  }

  goBack = () =>{
    this.dialogRef.close();
  }
}

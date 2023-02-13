import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrescriptionInfo } from 'src/app/Interfaces/objects/PrescriptionInfo.model';
import { AppointmentManagementService } from 'src/app/shared/services/appointment-management.service';

@Component({
  selector: 'app-patient-prescriptions-dialog',
  templateUrl: './patient-prescriptions-dialog.component.html',
  styleUrls: ['./patient-prescriptions-dialog.component.css']
})
export class PatientPrescriptionsDialogComponent {
  prescriptions: PrescriptionInfo[];

  constructor(
    public dialogRef: MatDialogRef<PatientPrescriptionsDialogComponent>,
    private appointmentService: AppointmentManagementService,
    @Inject(MAT_DIALOG_DATA) public patientEmail: string){
    this.getPatientPrescriptions();
  }

  getPatientPrescriptions = () =>{
    this.appointmentService.getAppointments(`api/Appointment/GetPatientPrescriptions/${this.patientEmail}`).subscribe(res=>{
      this.prescriptions = res as PrescriptionInfo[];
    })
  }

  goBack = () =>{
    this.dialogRef.close();
  }
}

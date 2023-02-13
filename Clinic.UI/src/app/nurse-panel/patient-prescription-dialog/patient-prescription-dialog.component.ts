import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentInfo } from 'src/app/Interfaces/objects/AppointmentInfo.model';
import { PrescriptionInfo } from 'src/app/Interfaces/objects/PrescriptionInfo.model';
import { AppointmentManagementService } from 'src/app/shared/services/appointment-management.service';

@Component({
  selector: 'app-patient-prescription-dialog',
  templateUrl: './patient-prescription-dialog.component.html',
  styleUrls: ['./patient-prescription-dialog.component.css']
})
export class PatientPrescriptionDialogComponent {
  showError: boolean = false;
  errorMessage: string;
  prescriptions: PrescriptionInfo[];

  constructor(public dialogRef: MatDialogRef<PatientPrescriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) public appointment: AppointmentInfo, private appointmentService: AppointmentManagementService){
    this.getAppointmentPrescriptions(this.appointment.id);
  }

  goBack = () =>{
    this.dialogRef.close();
  }

  getAppointmentPrescriptions(appointmentId: string){
    this.showError = false;
    this.appointmentService.getPrescriptions(`api/Appointment/GetAppointmentPrescriptions/${this.appointment.id}`).subscribe({
      next: (res)=>{
        if(res==null){
          this.showError = true;
          this.errorMessage = 'There are no prescriptions data!'
        }
        else{
          this.prescriptions = res as PrescriptionInfo[];
        }
      },
      error: (_) =>{
        this.showError = true;
        this.errorMessage = "Can't get any data!"
      }
    });
  }
}

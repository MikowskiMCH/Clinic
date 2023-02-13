import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentInfo } from 'src/app/Interfaces/objects/AppointmentInfo.model';
import { PrescriptionInfo } from 'src/app/Interfaces/objects/PrescriptionInfo.model';
import { AppointmentManagementService } from 'src/app/shared/services/appointment-management.service';

@Component({
  selector: 'app-prescription-add-dialog',
  templateUrl: './prescription-add-dialog.component.html',
  styleUrls: ['./prescription-add-dialog.component.css']
})
export class PrescriptionAddDialogComponent implements OnInit {
  prescriptionForm: FormGroup;

  constructor(private appointmentService: AppointmentManagementService, public dialogRef: MatDialogRef<PrescriptionAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public appointment: AppointmentInfo){

  }

  ngOnInit(): void {
    this.prescriptionForm = new FormGroup({
      description: new FormControl('', Validators.required),
      medicines: new FormControl(''),
    });
  }

  createNewPrescription = (prescriptionForm: any) =>{
    const prescriptionFormValues = {...prescriptionForm};

    const prescription:  PrescriptionInfo = {
      description: prescriptionFormValues.description,
      medicines: prescriptionFormValues.medicines,
      appointment: this.appointment,
      wroteBy: this.appointment.doctor,
    };

    this.appointmentService.createPrescription('api/Appointment/CreatePrescription', prescription).subscribe({
      next: (_) =>{
        this.dialogRef.close()
      },
      error: (_) =>{
        alert("Prescription create error!");
      }
    })
  }

  goBack = () =>{
    this.dialogRef.close();
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentInfo } from 'src/app/Interfaces/objects/AppointmentInfo.model';
import { Status } from 'src/app/Interfaces/objects/Status.model';
import { AppointmentManagementService } from 'src/app/shared/services/appointment-management.service';
import { PatientPrescriptionDialogComponent } from '../patient-prescription-dialog/patient-prescription-dialog.component';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements AfterViewInit, OnInit {
  status: Status;
  patientId: string;
  showError: boolean = false;
  errorMessage: string;
  dataSource= new MatTableDataSource<AppointmentInfo>;
  displayedColumns: string[] = ['appointmentAt', 'doctor', 'status', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute ,private router: Router, private appointmentService: AppointmentManagementService, private dialog: MatDialog){
    this.patientId = this.route.snapshot.paramMap.get('Id');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getappointements();
  }

  getappointements = () =>{
    this.showError = false;
    this.appointmentService.getAppointments(`api/Appointment/GetAllAppointmentsForPatient/${this.patientId}`).subscribe({
      next: (res) =>{
        this.dataSource.data = res as [];
      },
      error: (_) =>{
        this.showError = true;
        this.errorMessage = 'There are no appointments yet!';
      }
    })
  }

  getStatusName = (statusId: string) =>{
    var status: string = '';
    if(statusId == "1"){
      status = 'Unaccepted';
    }
    else if(statusId == "2"){
      status = 'Accepted';
    }
    else if(statusId == "3"){
      status = 'Finished';
    }
    else{
      status = 'Cancelled';
    }

    return status;
  }

  showGetPrescriptionsButton = (statusId: string) =>{
    var show: boolean = false;
    if(statusId == "3"){
      show = true;
    }
    return show;
  }

  openPrescriptionsDialog = (appointment: AppointmentInfo)=>{
    const dialogRef = this.dialog.open(PatientPrescriptionDialogComponent, {data: appointment});
  }
}

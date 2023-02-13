import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppointmentManagementService } from '../shared/services/appointment-management.service';
import { AppointmentInfo } from '../Interfaces/objects/AppointmentInfo.model';
import { MatDialog } from '@angular/material/dialog';
import { PatientInfoDialogComponent } from '../home-dialog/patient-info-dialog/patient-info-dialog.component';
import { PatientPrescriptionsDialogComponent } from '../home-dialog/patient-prescriptions-dialog/patient-prescriptions-dialog.component';
import { PrescriptionAddDialogComponent } from '../home-dialog/prescription-add-dialog/prescription-add-dialog.component';
import { PrescriptionInfo } from '../Interfaces/objects/PrescriptionInfo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoomForManagement } from '../Interfaces/objects/RoomForManagement.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<AppointmentInfo>;
  displayedColumns: string[] = ['patient', 'appointmentAt', 'doctor', 'options']

  @ViewChild(MatPaginator) paginatorP: MatPaginator;
  @ViewChild(MatSort) sortP: MatSort;
  dataSourceP = new MatTableDataSource<PrescriptionInfo>;
  displayedColumnsP: string[] = ['date', 'doctor', 'description', 'medicines']

  showErrorPatient: boolean = false;
  showErrorNext: boolean = false;
  showErrorDuty: boolean = false;
  errorMessageNext: string;
  errorMessageDuty: string;
  errorMessagePatient: string;
  dailyAppointments: AppointmentInfo[];
  nextAppointment: AppointmentInfo;
  nextPatientAppointment: AppointmentInfo;
  showErrorApproved: boolean = false;
  errorMessageApprove: string;
  name: string;
  role: string;
  email: string;
  patientAppointmentRoom: RoomForManagement;

  constructor(private jwtService: JwtHelperService, private appointmentService: AppointmentManagementService, private dialog: MatDialog){
    const token = localStorage.getItem('token')
    const decodedToken = this.jwtService.decodeToken(token)
    this.name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    
  }

  ngOnInit(): void {
    if(this.role === "Doctor"){
      this.dailyDuty();
      this.nearestAppointment();
    }
    if(this.role === "Nurse"){
      this.getNotApprovedAppointments();
    }
    if(this.role === "Patient"){
      this.getNextAppointment();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSourceP.paginator = this.paginatorP;
    this.dataSourceP.sort = this.sortP;
  }

  /* Doctor part */
  dailyDuty = () =>{
    if(this.role === "Doctor"){
      this.showErrorDuty = false;
      this.appointmentService.getAppointments(`api/Appointment/GetDoctorDailyDuty/${this.email}`).subscribe({
        next: (res) =>{
          if(res == null){
            this.showErrorDuty = true;
            this.errorMessageDuty = "You don't have any appointments scheduled for today.";
          }
          else{
            this.dailyAppointments = res as AppointmentInfo[];
          }
        },
        error: (_) =>{
          this.showErrorDuty = true;
          this.errorMessageDuty = "No data can be obtained!";
        }
      });
    }
    else{
      console.error("You are not a doctor!");
    }
  }

  nearestAppointment = () =>{
    if(this.role === "Doctor"){
      this.showErrorNext = false;
      this.appointmentService.getAppointments(`api/Appointment/GetNextAppointmentInfo/${this.email}`).subscribe({
        next: (res) =>{
          if(res == null){
            this.showErrorNext = true;
            this.errorMessageNext = "You don't have any appointments scheduled yet.";
          }
          else{
            this.nextAppointment = res as AppointmentInfo;
          }
        },
        error: (_) =>{
          this.showErrorNext = true;
          this.errorMessageNext = "Can't get any data!";
        }
      });
    }
    else{
      console.error("You are not a doctor!");
    }
  }

  getPatientInfo = (patientEmail: string) =>{
    this.dialog.open(PatientInfoDialogComponent,{ data:  patientEmail});
  }

  getPatientPrescriptions = (patientEmail: string) =>{
    this.dialog.open(PatientPrescriptionsDialogComponent, {data: patientEmail});
  }

  addPrescription = (appointment: AppointmentInfo) =>{
    this.dialog.open(PrescriptionAddDialogComponent, {data: appointment})
  }

  /* Nurse part */

  getNotApprovedAppointments = () =>{
    this.showErrorApproved = false;
    this.appointmentService.getAppointments(`api/Appointment/GetAppointmentsWithStatus/1/${this.email}`).subscribe({
      next: (res) =>{
        if(res == null){
          this.showErrorApproved = true;
          this.errorMessageApprove = 'There are no appointments to manage. Check later!';
        }
        else{
          this.dataSource.data = res as AppointmentInfo[];
        }
      },
      error: (_) =>{
        this.showErrorApproved = true;
        this.errorMessageApprove = "No data can be obtained!";
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approveAppointment = (appointment: AppointmentInfo) =>{
    this.showErrorApproved = false;
    this.appointmentService.acceptAppointment('api/Appointment/AcceptAppointment',appointment).subscribe({
      next: (_) =>{
        window.location.reload();
        this.showErrorApproved = true;
        this.errorMessageApprove = 'You succesfully accpeted appointment!';
      },
      error: (_) =>{
        this.showErrorApproved = true;
        this.errorMessageApprove = "You can't accept this appointment!";
      }
    });
  }

  cancelAppointment = (appointment: AppointmentInfo) =>{
    this.showErrorApproved = false;
    this.appointmentService.acceptAppointment('api/Appointment/UnacceptAppointment', appointment).subscribe({
      next: (_) =>{
        window.location.reload();
        this.showErrorApproved = true;
        this.errorMessageApprove = 'You have successfully canceled the meeting!';
      },
      error: (_) =>{
        this.showErrorApproved = true;
        this.errorMessageApprove = "This meeting can't be canceled!";
      }
    });
  }

  /* Patient part */

  getNextAppointment = () =>{ 
    this.appointmentService.getAppointments(`api/Appointment/GetNextAppointemnt/${this.email}`).subscribe({
      next: (res) =>{
        if(res == null){
          this.showErrorPatient = true;
          this.errorMessagePatient = "You don't have any appointments scheduled yet!";
        }
        else{
          this.nextPatientAppointment = res as AppointmentInfo;
          this.getDoctorRoom(this.nextPatientAppointment.doctor.email)
        }
      },
      error: (_) =>{
        this.showErrorPatient = true;
        this.errorMessagePatient = "Can't get any next appointment data!";
      }
    });
  }

  getDoctorRoom = (email: string) => {
    this.showErrorPatient = false;
    this.appointmentService.getRoom(`api/Appointment/GetRoom/${email}`).subscribe({
      next: (res) =>{
        if(res != null){
          if(res.doctor != null && res.number != null && res.nurse != null && res.specjalization != null){
            this.patientAppointmentRoom = res;
          }
          else{
            this.patientAppointmentRoom = null;
          }
        }
        else{
          this.showErrorPatient = true;
          this.errorMessagePatient = 'Can not find any room for the doctor!';
        }
      },
      error: (_) =>{
        this.showErrorPatient = true;
        this.errorMessagePatient = "Can't get any room data!";
      }
    })
  }

  getLastAppointments = () =>{
    this.showErrorPatient = false;
    this.appointmentService.getAppointments(`api/Appointments/GetLastAppointment/${this.email}`).subscribe({
      next: (res) =>{
        if(res == null){
          this.showErrorPatient = true;
          this.errorMessagePatient = "You don't have appointments scheduled yet!";
        }
        else{
          this.dataSourceP.data = res as PrescriptionInfo[];
        }
      },
      error: (_) =>{
        this.showErrorPatient = true;
        this.errorMessagePatient = "Can't get any appointment data!";
      }
    });
  }
}
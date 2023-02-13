import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Appointment } from 'src/app/Interfaces/objects/Appointment.model';
import { AppointmentManagementService } from 'src/app/shared/services/appointment-management.service';

@Component({
  selector: 'app-make-visit',
  templateUrl: './make-visit.component.html',
  styleUrls: ['./make-visit.component.css']
})
export class MakeVisitComponent {
  newAppointment: Appointment;
  appointments: Appointment[];
  time: Appointment[];
  doctorId: string;
  enabled: boolean = false;
  minDate: Date;
  maxDate: Date;
  date: Date;

  constructor(private route: ActivatedRoute ,private router: Router, private appointemntService: AppointmentManagementService, private JwtService: JwtHelperService) {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();

    this.minDate = new Date(currentYear - 0, currentMonth, currentDate + 1);
    this.maxDate = new Date(currentYear + 0, 0, (currentDate + 60));
    this.doctorId = this.route.snapshot.paramMap.get('state');
    this.getAppointments();
  }

  takeDate = () =>{
    const month = this.date.getMonth() + 1;
    const date = this.date.getDate();
    
    let monthString: string = `${month}`;
    let dateString: string = `${date}`;

    this.enabled = true;

    if(date<10){
      dateString = `0${date}`;
    }

    if(month<10){
      monthString = `0${month}`;
    }

    this.time = [
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 08:00`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 08:35`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 09:10`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 09:45`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 10:20`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 10:55`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 11:30`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 12:20`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 12:55`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 13:30`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 14:05`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 14:40`},
      {patient: null, doctor: null, status: 0, appointmentAt: `${dateString}.${monthString}.${this.date.getFullYear()} 15:15`},
    ];

    this.time.forEach(element =>{
      this.replaceAppointment(element);
    });
  }

  myFilter = (d: Date): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  getAppointments = () =>{
    this.appointemntService.getAppointments(`api/Patient/GetAvAllAppointments/${this.doctorId}`).subscribe(res=>{
      this.appointments = res as [];
    });
  }

  send = () =>{
    const appointmentDate = this.newAppointment.appointmentAt + ':00';
    const token = window.localStorage.getItem('token')
    const decodedToken = this.JwtService.decodeToken(token);
    const patient = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    const appointmentRequest = {doctor: this.doctorId, appointmentAt: appointmentDate, patient: patient, status: 1};

    this.appointemntService.createAppointment('api/Patient/CreateAppointment', appointmentRequest).subscribe({
      next: (_) =>{
        window.alert("Your request is waitting for accept!")
        this.router.navigate(['/home']);  
      },
      error: (_) =>{
        alert("Sending request error!");
      }
    });
  }

  replaceAppointment = (appointment: Appointment) =>{
    this.appointments.forEach(element => {
      if(appointment.appointmentAt + ':00' == element.appointmentAt){
        appointment.status = element.status;
      }
    });
  }

  isDissabled = (state: number) =>{
    let disabled: boolean = false;

    if(state>0){
      disabled = true;
    }
    
    return disabled;
  }
}





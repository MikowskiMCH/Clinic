import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomForManagement } from 'src/app/Interfaces/objects/RoomForManagement.model';
import { RoomManagementService } from 'src/app/shared/services/room-management.service';

@Component({
  selector: 'app-visit-doctor-selection',
  templateUrl: './visit-doctor-selection.component.html',
  styleUrls: ['./visit-doctor-selection.component.css']
})
export class VisitDoctorSelectionComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string;
  rooms: RoomForManagement[];
  selectedRoom: RoomForManagement;

  constructor(private router: Router, private roomService: RoomManagementService){}

  ngOnInit(): void {
    this.getRoomsData();
  }

  getRoomsData = () =>{
    this.showError = false;
    this.roomService.getRoomData('api/Room/GetRoomsData').subscribe({
      next: (res) =>{
        if(res as RoomForManagement[] == null || Object.keys(res).length < 1){
          this.showError = true;
          this.errorMessage = "There are no available doctors for now. Check later!"
        }
        else{
          this.rooms = res as RoomForManagement[];
        }
      },
      error: (_) =>{
        this.showError = true;
        this.errorMessage = "No data can be taken!"
      }
    });
  }

  GoToMakeAppointment = (doctor: string) =>{
    this.router.navigate(['patient-panel/patient-visit/make-visit', {state: doctor}]);
  }
}